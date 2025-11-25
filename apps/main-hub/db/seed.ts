/**
 * Database Seed Script
 * Populates sla_metrics table with realistic historical data
 * 
 * Usage: npx tsx db/seed.ts
 * Requires: POSTGRES_URL environment variable
 */

import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createPool } from '@vercel/postgres';
import { slaMetrics } from './schema';

async function seed() {
    const connectionString = process.env.POSTGRES_URL;
    
    if (!connectionString) {
        console.error('❌ POSTGRES_URL environment variable is required');
        console.log('   Set it in .env.local or export it before running');
        process.exit(1);
    }

    console.log('🌱 Starting database seed...');
    
    const pool = createPool({ connectionString });
    const db = drizzle(pool);

    // Generate 30 days of historical SLA metrics (every 6 hours = 4 per day)
    const metrics: typeof slaMetrics.$inferInsert[] = [];
    const now = new Date();
    
    for (let day = 30; day >= 0; day--) {
        for (let hour = 0; hour < 24; hour += 6) {
            const timestamp = new Date(now);
            timestamp.setDate(timestamp.getDate() - day);
            timestamp.setHours(hour, 0, 0, 0);

            // Generate realistic metrics with slight variations
            // Base values reflect a well-maintained production system
            const baseUptime = 9992; // 99.92%
            const baseLatency = 145; // ms
            const baseErrorRate = 8; // 0.08%
            const baseRequests = 2500;

            // Add realistic jitter
            const uptimeJitter = Math.floor(Math.random() * 10) - 3; // -3 to +7
            const latencyJitter = Math.floor(Math.random() * 40) - 15; // -15 to +25
            const errorJitter = Math.floor(Math.random() * 10) - 3; // -3 to +7
            const requestsJitter = Math.floor(Math.random() * 1000) - 300; // -300 to +700

            // Simulate occasional degradation (5% chance)
            const isDegraded = Math.random() < 0.05;
            
            metrics.push({
                uptime: Math.min(10000, Math.max(9900, baseUptime + uptimeJitter - (isDegraded ? 20 : 0))),
                latency: Math.max(80, baseLatency + latencyJitter + (isDegraded ? 50 : 0)),
                errorRate: Math.max(1, baseErrorRate + errorJitter + (isDegraded ? 15 : 0)),
                requests: Math.max(500, baseRequests + requestsJitter),
                timestamp,
            });
        }
    }

    console.log(`📊 Inserting ${metrics.length} SLA metric records...`);

    try {
        // Clear existing data
        await db.delete(slaMetrics);
        console.log('   Cleared existing metrics');

        // Insert new data in batches
        const batchSize = 50;
        for (let i = 0; i < metrics.length; i += batchSize) {
            const batch = metrics.slice(i, i + batchSize);
            await db.insert(slaMetrics).values(batch);
            console.log(`   Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(metrics.length / batchSize)}`);
        }

        console.log('✅ Seed completed successfully!');
        console.log(`   Total records: ${metrics.length}`);
        console.log(`   Date range: ${metrics[0]?.timestamp?.toISOString()} to ${metrics[metrics.length - 1]?.timestamp?.toISOString()}`);
        
        // Show sample stats
        const avgUptime = metrics.reduce((sum, m) => sum + m.uptime, 0) / metrics.length / 100;
        const avgLatency = metrics.reduce((sum, m) => sum + m.latency, 0) / metrics.length;
        console.log(`   Avg Uptime: ${avgUptime.toFixed(2)}%`);
        console.log(`   Avg Latency: ${avgLatency.toFixed(0)}ms`);

    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }

    await pool.end();
    process.exit(0);
}

seed();
