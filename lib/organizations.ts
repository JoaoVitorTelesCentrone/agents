import 'server-only';
import { AppError } from '@/lib/http';
import { requireUser } from '@/lib/auth';
import { toSlug } from '@/lib/validation/common';
import { createOrganizationSchema } from '@/lib/validation/organization';

export async function listOrganizations() {
  const { supabase } = await requireUser();
  const { data, error } = await supabase
    .from('organizations')
    .select('id, name, slug, created_at, organization_members!inner(role)')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createOrganization(input: unknown) {
  const parsed = createOrganizationSchema.parse(input);
  const { supabase, user } = await requireUser();
  const slug = toSlug(parsed.slug || parsed.name);
  if (!slug) throw new AppError('A valid organization slug is required', 422, 'INVALID_SLUG');

  const { data, error } = await supabase
    .from('organizations')
    .insert({ name: parsed.name, slug, created_by: user.id })
    .select('id, name, slug, created_at')
    .single();
  if (error) {
    if (error.code === '23505') throw new AppError('Organization slug is already in use', 409, 'SLUG_TAKEN');
    throw error;
  }
  return data;
}
