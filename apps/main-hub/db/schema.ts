import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const rfcs = pgTable('rfcs', {
    id: serial('id').primaryKey(),
    companyName: text('company_name').notNull(),
    contactEmail: text('contact_email').notNull(),
    projectDescription: text('project_description').notNull(),
    budget: text('budget'),
    timeline: text('timeline'),
    score: integer('score'),
    status: text('status').default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const slaMetrics = pgTable('sla_metrics', {
    id: serial('id').primaryKey(),
    uptime: integer('uptime').notNull(), // Percentage * 100 (e.g., 9999 for 99.99%)
    latency: integer('latency').notNull(), // in ms
    errorRate: integer('error_rate').notNull(), // Percentage * 100
    requests: integer('requests').notNull(),
    timestamp: timestamp('timestamp').defaultNow(),
});

export const analyticsEvents = pgTable('analytics_events', {
    id: serial('id').primaryKey(),
    eventName: text('event_name').notNull(),
    path: text('path').notNull(),
    properties: jsonb('properties'),
    sessionId: text('session_id'),
    timestamp: timestamp('timestamp').defaultNow(),
});
