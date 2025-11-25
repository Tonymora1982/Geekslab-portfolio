import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { slaMetrics } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const runtime = 'edge';

export async function GET() {
    try {
        const db = drizzle(sql);
        const history = await db.select().from(slaMetrics).orderBy(desc(slaMetrics.timestamp));

        const formattedHistory = history.map(data => ({
            uptime: data.uptime / 100,
            latency: data.latency,
            errorRate: data.errorRate / 100,
            status: data.uptime >= 9990 ? 'healthy' : data.uptime >= 9950 ? 'degraded' : 'critical',
            lastUpdated: data.timestamp.toISOString(),
        }));

        return NextResponse.json(formattedHistory);
    } catch (error) {
        console.error('Error fetching SLA metrics history:', error);
        return NextResponse.json({ error: 'Failed to fetch SLA metrics history' }, { status: 500 });
    }
}
