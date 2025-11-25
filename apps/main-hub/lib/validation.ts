import { z } from 'zod';

export const rfcSchema = z.object({
    companyName: z.string().min(2, "Company name must be at least 2 characters long"),
    contactEmail: z.string().email("Invalid email address"),
    projectDescription: z.string().min(10, "Project description must be at least 10 characters long"),
    budget: z.string().optional(),
    timeline: z.string().optional(),
});

export type RFCFormData = z.infer<typeof rfcSchema>;
