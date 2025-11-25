import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { slaMetrics } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const runtime = 'edge';

export async function GET() {
    try {
        const db = drizzle(sql);
        const latest = await db.select().from(slaMetrics).orderBy(desc(slaMetrics.timestamp)).limit(1);

        if (latest.length === 0) {
            return NextResponse.json({ error: 'No SLA metrics found' }, { status: 404 });
        }

        const data = latest[0];
        const status = data.uptime >= 9990 ? 'healthy' : data.uptime >= 9950 ? 'degraded' : 'critical'; // Assuming uptime is stored as percentage * 100
        const formattedData = {
            uptime: data.uptime / 100,
            latency: data.latency,
            errorRate: data.errorRate / 100,
            status: status,
            lastUpdated: data.timestamp.toISOString(),
        };

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error('Error fetching SLA metrics:', error);
        return NextResponse.json({ error: 'Failed to fetch SLA metrics' }, { status: 500 });
    }
}
