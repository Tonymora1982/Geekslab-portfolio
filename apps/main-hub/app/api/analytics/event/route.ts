import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { analyticsEvents } from '@/db/schema';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        // Check for Do Not Track header for GDPR compliance
        const doNotTrack = request.headers.get('DNT');
        if (doNotTrack === '1') {
            return NextResponse.json({ success: true, message: 'Event not recorded due to Do Not Track setting' });
        }

        const body = await request.json();
        let { eventName, path, properties, sessionId } = body;

        if (!eventName || !path) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Ensure no PII is stored directly in properties
        // This is a basic example; a more robust solution would involve
        // explicit filtering or hashing of sensitive fields.
        if (properties && typeof properties === 'object') {
            const filteredProperties: { [key: string]: any } = {};
            for (const key in properties) {
                if (properties.hasOwnProperty(key)) {
                    // Example: filter out common PII fields
                    if (!['email', 'name', 'phone', 'address'].includes(key.toLowerCase())) {
                        filteredProperties[key] = properties[key];
                    }
                }
            }
            properties = filteredProperties;
        }

        const db = drizzle(sql);
        await db.insert(analyticsEvents).values({
            eventName,
            path,
            properties: properties || {}, // Ensure properties is an object
            sessionId: sessionId || null, // Optional session ID
            timestamp: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics Event Recording Error:', error);
        return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
    }
}
