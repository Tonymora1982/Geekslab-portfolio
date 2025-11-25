import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { rfcs } from '@/db/schema';
import { count, avg } from 'drizzle-orm';

export const runtime = 'edge';

export async function GET() {
    try {
        const db = drizzle(sql);
        const result = await db.select({
            totalSubmissions: count(rfcs.id),
            averageScore: avg(rfcs.score),
        }).from(rfcs);

        const stats = result[0];

        return NextResponse.json({
            totalSubmissions: stats.totalSubmissions || 0,
            averageScore: parseFloat(stats.averageScore || '0').toFixed(2),
        });
    } catch (error) {
        console.error('Error fetching RFC stats:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
