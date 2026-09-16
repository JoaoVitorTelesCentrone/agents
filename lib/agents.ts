import 'server-only';
import { AppError } from '@/lib/http';
import { requireOrganization } from '@/lib/auth';
import { toSlug } from '@/lib/validation/common';
import { createAgentSchema, updateAgentSchema } from '@/lib/validation/agent';

export async function listAgents(organizationId: string) {
  const { supabase } = await requireOrganization(organizationId);
  const { data, error } = await supabase.from('agents').select('*').eq('organization_id', organizationId).neq('status', 'archived').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getAgent(organizationId: string, id: string) {
  const { supabase } = await requireOrganization(organizationId);
  const { data, error } = await supabase.from('agents').select('*').eq('organization_id', organizationId).eq('id', id).maybeSingle();
  if (error) throw error;
  if (!data) throw new AppError('Agent not found', 404, 'AGENT_NOT_FOUND');
  return data;
}

export async function createAgent(input: unknown) {
  const parsed = createAgentSchema.parse(input);
  const { supabase, user } = await requireOrganization(parsed.organizationId);
  const slug = toSlug(parsed.slug || parsed.name);
  if (!slug) throw new AppError('A valid agent slug is required', 422, 'INVALID_SLUG');
  const { data, error } = await supabase.from('agents').insert({
    organization_id: parsed.organizationId,
    project_id: parsed.projectId ?? null,
    name: parsed.name,
    slug,
    description: parsed.description ?? null,
    system_prompt: parsed.systemPrompt,
    provider: parsed.provider,
    model: parsed.model,
    status: parsed.status,
    temperature: parsed.temperature ?? null,
    max_output_tokens: parsed.maxOutputTokens ?? null,
    created_by: user.id,
  }).select('*').single();
  if (error) {
    if (error.code === '23505') throw new AppError('Agent slug is already in use', 409, 'SLUG_TAKEN');
    throw error;
  }
  return data;
}

export async function updateAgent(organizationId: string, id: string, input: unknown) {
  const parsed = updateAgentSchema.parse(input);
  const { supabase } = await requireOrganization(organizationId);
  const patch: Record<string, unknown> = {};
  if (parsed.projectId !== undefined) patch.project_id = parsed.projectId;
  if (parsed.name !== undefined) patch.name = parsed.name;
  if (parsed.slug !== undefined) patch.slug = toSlug(parsed.slug);
  if (parsed.description !== undefined) patch.description = parsed.description;
  if (parsed.systemPrompt !== undefined) patch.system_prompt = parsed.systemPrompt;
  if (parsed.provider !== undefined) patch.provider = parsed.provider;
  if (parsed.model !== undefined) patch.model = parsed.model;
  if (parsed.status !== undefined) patch.status = parsed.status;
  if (parsed.temperature !== undefined) patch.temperature = parsed.temperature;
  if (parsed.maxOutputTokens !== undefined) patch.max_output_tokens = parsed.maxOutputTokens;
  const { data, error } = await supabase.from('agents').update(patch).eq('organization_id', organizationId).eq('id', id).select('*').single();
  if (error) throw error;
  return data;
}

export async function deleteAgent(organizationId: string, id: string) {
  const { supabase } = await requireOrganization(organizationId);
  const { error } = await supabase.from('agents').update({ status: 'archived' }).eq('organization_id', organizationId).eq('id', id);
  if (error) throw error;
}
