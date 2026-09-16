import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().optional(),
});

export const inviteMemberSchema = z.object({
  email: z.email(),
  role: z.enum(['admin', 'member']).default('member'),
});
