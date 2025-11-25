import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { rfcs } from '@/db/schema';
import { Resend } from 'resend';
import { ApplicationFormSchema, scoreApplication } from '@geekslab/ui';

// In-memory store for rate limiting (for demonstration purposes)
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();
const MAX_REQUESTS = 5;
const WINDOW_SIZE_MS = 60 * 60 * 1000; // 1 hour

// Lazy initialization to avoid build-time errors
const getResend = () => {
    if (!process.env.RESEND_API_KEY) return null;
    return new Resend(process.env.RESEND_API_KEY);
};

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        // Rate Limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const now = Date.now();
        const client = rateLimitStore.get(ip) || { count: 0, lastReset: now };

        if (now - client.lastReset > WINDOW_SIZE_MS) {
            client.count = 0;
            client.lastReset = now;
        }

        if (client.count >= MAX_REQUESTS) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        client.count++;
        rateLimitStore.set(ip, client);

        const body = await request.json();

        const validationResult = ApplicationFormSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validationResult.error.flatten() },
                { status: 400 }
            );
        }

        const formData = validationResult.data;
        const scoringResult = scoreApplication(formData);
        const { companyName, contactEmail, projectDescription, budget, timeline } = formData;
        const score = scoringResult.totalScore;

        const db = drizzle(sql);
        await db.insert(rfcs).values({
            companyName,
            contactEmail,
            projectDescription,
            budget,
            timeline,
            score,
            status: 'pending',
        });

        // Send email notification
        const resend = getResend();
        if (resend) {
            await resend.emails.send({
                from: 'onboarding@resend.dev', // Replace with your verified domain
                to: 'anthony@geekslab.tech', // Replace with your recipient email
                subject: `New RFC Submission from ${companyName}`,
                html: `
                    <p><strong>Company Name:</strong> ${companyName}</p>
                    <p><strong>Contact Email:</strong> ${contactEmail}</p>
                    <p><strong>Project Description:</strong> ${projectDescription}</p>
                    <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
                    <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
                    <p><strong>Calculated Score:</strong> ${score}</p>
                    <p><strong>Decision:</strong> ${scoringResult.decision}</p>
                    <p><strong>Breakdown:</strong></p>
                    <ul>
                        ${Object.entries(scoringResult.breakdown).map(([key, val]) => `<li>${key}: ${val.score}/${val.max}</li>`).join('')}
                    </ul>
                `,
            });
        }


        return NextResponse.json({
            success: true,
            message: 'RFC submitted successfully',
            result: scoringResult
        });

    } catch (error) {
        console.error('RFC Submission Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
