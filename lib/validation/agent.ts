import { z } from 'zod';
import { uuidSchema } from './common';

export const aiProviderSchema = z.enum(['openai', 'gemini', 'deepseek']);

export const createAgentSchema = z.object({
  organizationId: uuidSchema,
  projectId: uuidSchema.optional().nullable(),
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().optional(),
  description: z.string().trim().max(4000).optional().nullable(),
  systemPrompt: z.string().max(50000).default(''),
  provider: aiProviderSchema,
  model: z.string().trim().min(1).max(160),
  temperature: z.number().min(0).max(2).optional().nullable(),
  maxOutputTokens: z.number().int().positive().max(131072).optional().nullable(),
  status: z.enum(['active', 'paused', 'archived']).default('active'),
});

export const updateAgentSchema = createAgentSchema.omit({ organizationId: true }).partial();

export const executeAgentSchema = z.object({
  organizationId: uuidSchema,
  agentId: uuidSchema,
  prompt: z.string().trim().min(1).max(100000),
});
