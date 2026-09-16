import { z } from 'zod';
import { uuidSchema } from './common';

export const createProjectSchema = z.object({
  organizationId: uuidSchema,
  name: z.string().trim().min(1).max(160),
  slug: z.string().trim().optional(),
  description: z.string().trim().max(4000).optional().nullable(),
});

export const updateProjectSchema = createProjectSchema.omit({ organizationId: true }).partial();
