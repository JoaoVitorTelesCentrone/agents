import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { AppError } from '@/lib/http';

export async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
  return { supabase, user: data.user };
}

export async function requireOrganization(organizationId: string) {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from('organization_members')
    .select('organization_id, role')
    .eq('organization_id', organizationId)
    .eq('user_id', user.id)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new AppError('Organization not found', 404, 'ORGANIZATION_NOT_FOUND');
  return { supabase, user, membership: data };
}
