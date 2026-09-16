import 'server-only';
import { AppError } from '@/lib/http';
import { requireOrganization } from '@/lib/auth';
import { toSlug } from '@/lib/validation/common';
import { createProjectSchema, updateProjectSchema } from '@/lib/validation/project';

export async function listProjects(organizationId: string) {
  const { supabase } = await requireOrganization(organizationId);
  const { data, error } = await supabase.from('projects').select('*').eq('organization_id', organizationId).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createProject(input: unknown) {
  const parsed = createProjectSchema.parse(input);
  const { supabase, user } = await requireOrganization(parsed.organizationId);
  const slug = toSlug(parsed.slug || parsed.name);
  if (!slug) throw new AppError('A valid project slug is required', 422, 'INVALID_SLUG');
  const { data, error } = await supabase.from('projects').insert({
    organization_id: parsed.organizationId,
    name: parsed.name,
    slug,
    description: parsed.description ?? null,
    created_by: user.id,
  }).select('*').single();
  if (error) {
    if (error.code === '23505') throw new AppError('Project slug is already in use', 409, 'SLUG_TAKEN');
    throw error;
  }
  return data;
}

export async function updateProject(organizationId: string, id: string, input: unknown) {
  const parsed = updateProjectSchema.parse(input);
  const { supabase } = await requireOrganization(organizationId);
  const patch: Record<string, unknown> = { ...parsed };
  if (parsed.slug) patch.slug = toSlug(parsed.slug);
  delete patch.organizationId;
  const { data, error } = await supabase.from('projects').update(patch).eq('organization_id', organizationId).eq('id', id).select('*').single();
  if (error) throw error;
  return data;
}
