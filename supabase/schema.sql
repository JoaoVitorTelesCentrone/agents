-- Agents OS canonical database schema.
-- Apply to a dedicated Supabase project, then capture the resulting schema as a CLI-generated migration.

create extension if not exists pgcrypto with schema extensions;
create extension if not exists vector with schema extensions;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create type public.organization_role as enum ('owner', 'admin', 'member');
create type public.agent_status as enum ('active', 'paused', 'archived');
create type public.run_status as enum ('queued', 'running', 'completed', 'failed', 'cancelled');
create type public.inbox_status as enum ('unread', 'read', 'approved', 'rejected', 'resolved');
create type public.document_status as enum ('pending', 'processing', 'ready', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.organization_role not null default 'member',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 160),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table public.agents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  name text not null check (char_length(name) between 1 and 120),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text,
  system_prompt text not null default '',
  provider text not null check (provider in ('openai', 'gemini', 'deepseek')),
  model text not null,
  status public.agent_status not null default 'active',
  temperature numeric(3,2) check (temperature is null or (temperature >= 0 and temperature <= 2)),
  max_output_tokens integer check (max_output_tokens is null or max_output_tokens > 0),
  config jsonb not null default '{}'::jsonb,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  agent_id uuid not null references public.agents(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  triggered_by uuid references auth.users(id) on delete set null,
  status public.run_status not null default 'queued',
  input jsonb not null default '{}'::jsonb,
  output jsonb,
  error text,
  provider text not null,
  model text not null,
  input_tokens integer,
  output_tokens integer,
  estimated_cost_usd numeric(12,6),
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.agent_messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  run_id uuid not null references public.agent_runs(id) on delete cascade,
  role text not null check (role in ('system', 'user', 'assistant', 'tool')),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  uploaded_by uuid references auth.users(id) on delete set null,
  name text not null,
  mime_type text,
  size_bytes bigint,
  storage_path text not null unique,
  content_hash text,
  status public.document_status not null default 'pending',
  error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  document_id uuid not null references public.knowledge_documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  token_count integer,
  embedding extensions.vector(1536),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (document_id, chunk_index)
);

create table public.inbox_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  run_id uuid references public.agent_runs(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  type text not null default 'insight',
  title text not null,
  body text,
  status public.inbox_status not null default 'unread',
  requires_approval boolean not null default false,
  action_payload jsonb not null default '{}'::jsonb,
  resolved_by uuid references auth.users(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.usage_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  agent_id uuid references public.agents(id) on delete set null,
  run_id uuid references public.agent_runs(id) on delete set null,
  provider text,
  model text,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  estimated_cost_usd numeric(12,6) not null default 0,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  organization_id uuid primary key references public.organizations(id) on delete cascade,
  provider text not null default 'stripe',
  customer_id text unique,
  subscription_id text unique,
  price_id text,
  status text not null default 'inactive',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.webhook_events (
  id text primary key,
  provider text not null,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);

create index organization_members_user_idx on public.organization_members(user_id);
create index projects_org_idx on public.projects(organization_id);
create index agents_org_idx on public.agents(organization_id);
create index agents_project_idx on public.agents(project_id);
create index agent_runs_org_created_idx on public.agent_runs(organization_id, created_at desc);
create index agent_runs_agent_created_idx on public.agent_runs(agent_id, created_at desc);
create index agent_messages_run_created_idx on public.agent_messages(run_id, created_at);
create index knowledge_documents_org_idx on public.knowledge_documents(organization_id);
create index knowledge_chunks_document_idx on public.knowledge_chunks(document_id);
create index knowledge_chunks_embedding_idx on public.knowledge_chunks using hnsw (embedding vector_cosine_ops);
create index inbox_items_org_status_idx on public.inbox_items(organization_id, status, created_at desc);
create index usage_events_org_created_idx on public.usage_events(organization_id, created_at desc);

create or replace function private.is_org_member(target_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.organization_members om
      where om.organization_id = target_org_id
        and om.user_id = (select auth.uid())
    );
$$;

create or replace function private.has_org_role(target_org_id uuid, allowed_roles public.organization_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.organization_members om
      where om.organization_id = target_org_id
        and om.user_id = (select auth.uid())
        and om.role = any(allowed_roles)
    );
$$;

revoke all on function private.is_org_member(uuid) from public, anon;
revoke all on function private.has_org_role(uuid, public.organization_role[]) from public, anon;
grant execute on function private.is_org_member(uuid) to authenticated;
grant execute on function private.has_org_role(uuid, public.organization_role[]) to authenticated;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure private.handle_new_user();

create or replace function private.handle_new_organization()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.organization_members (organization_id, user_id, role)
  values (new.id, new.created_by, 'owner');
  return new;
end;
$$;

create trigger on_organization_created
after insert on public.organizations
for each row execute procedure private.handle_new_organization();

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles for each row execute procedure private.touch_updated_at();
create trigger organizations_touch_updated_at before update on public.organizations for each row execute procedure private.touch_updated_at();
create trigger projects_touch_updated_at before update on public.projects for each row execute procedure private.touch_updated_at();
create trigger agents_touch_updated_at before update on public.agents for each row execute procedure private.touch_updated_at();
create trigger knowledge_documents_touch_updated_at before update on public.knowledge_documents for each row execute procedure private.touch_updated_at();
create trigger subscriptions_touch_updated_at before update on public.subscriptions for each row execute procedure private.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.projects enable row level security;
alter table public.agents enable row level security;
alter table public.agent_runs enable row level security;
alter table public.agent_messages enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.inbox_items enable row level security;
alter table public.usage_events enable row level security;
alter table public.subscriptions enable row level security;
alter table public.webhook_events enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.organizations to authenticated;
grant select, insert, update, delete on public.organization_members to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.agents to authenticated;
grant select, insert, update on public.agent_runs to authenticated;
grant select, insert on public.agent_messages to authenticated;
grant select, insert, update, delete on public.knowledge_documents to authenticated;
grant select, insert, update, delete on public.knowledge_chunks to authenticated;
grant select, insert, update on public.inbox_items to authenticated;
grant select on public.usage_events to authenticated;
grant select on public.subscriptions to authenticated;

create policy profiles_select_self on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_update_self on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy organizations_select_member on public.organizations for select to authenticated using (private.is_org_member(id));
create policy organizations_insert_creator on public.organizations for insert to authenticated with check ((select auth.uid()) = created_by);
create policy organizations_update_admin on public.organizations for update to authenticated using (private.has_org_role(id, array['owner','admin']::public.organization_role[])) with check (private.has_org_role(id, array['owner','admin']::public.organization_role[]));
create policy organizations_delete_owner on public.organizations for delete to authenticated using (private.has_org_role(id, array['owner']::public.organization_role[]));

create policy members_select_member on public.organization_members for select to authenticated using (private.is_org_member(organization_id));
create policy members_insert_admin on public.organization_members for insert to authenticated with check (private.has_org_role(organization_id, array['owner','admin']::public.organization_role[]));
create policy members_update_owner on public.organization_members for update to authenticated using (private.has_org_role(organization_id, array['owner']::public.organization_role[])) with check (private.has_org_role(organization_id, array['owner']::public.organization_role[]));
create policy members_delete_admin on public.organization_members for delete to authenticated using (private.has_org_role(organization_id, array['owner','admin']::public.organization_role[]));

create policy projects_select_member on public.projects for select to authenticated using (private.is_org_member(organization_id));
create policy projects_insert_member on public.projects for insert to authenticated with check (private.is_org_member(organization_id) and (select auth.uid()) = created_by);
create policy projects_update_member on public.projects for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy projects_delete_admin on public.projects for delete to authenticated using (private.has_org_role(organization_id, array['owner','admin']::public.organization_role[]));

create policy agents_select_member on public.agents for select to authenticated using (private.is_org_member(organization_id));
create policy agents_insert_member on public.agents for insert to authenticated with check (private.is_org_member(organization_id) and (select auth.uid()) = created_by);
create policy agents_update_member on public.agents for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy agents_delete_admin on public.agents for delete to authenticated using (private.has_org_role(organization_id, array['owner','admin']::public.organization_role[]));

create policy runs_select_member on public.agent_runs for select to authenticated using (private.is_org_member(organization_id));
create policy runs_insert_member on public.agent_runs for insert to authenticated with check (private.is_org_member(organization_id) and ((select auth.uid()) = triggered_by or triggered_by is null));
create policy runs_update_member on public.agent_runs for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));

create policy messages_select_member on public.agent_messages for select to authenticated using (private.is_org_member(organization_id));
create policy messages_insert_member on public.agent_messages for insert to authenticated with check (private.is_org_member(organization_id));

create policy documents_select_member on public.knowledge_documents for select to authenticated using (private.is_org_member(organization_id));
create policy documents_insert_member on public.knowledge_documents for insert to authenticated with check (private.is_org_member(organization_id));
create policy documents_update_member on public.knowledge_documents for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy documents_delete_member on public.knowledge_documents for delete to authenticated using (private.is_org_member(organization_id));

create policy chunks_select_member on public.knowledge_chunks for select to authenticated using (private.is_org_member(organization_id));
create policy chunks_insert_member on public.knowledge_chunks for insert to authenticated with check (private.is_org_member(organization_id));
create policy chunks_update_member on public.knowledge_chunks for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy chunks_delete_member on public.knowledge_chunks for delete to authenticated using (private.is_org_member(organization_id));

create policy inbox_select_member on public.inbox_items for select to authenticated using (private.is_org_member(organization_id));
create policy inbox_insert_member on public.inbox_items for insert to authenticated with check (private.is_org_member(organization_id));
create policy inbox_update_member on public.inbox_items for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));

create policy usage_select_member on public.usage_events for select to authenticated using (private.is_org_member(organization_id));
create policy subscriptions_select_admin on public.subscriptions for select to authenticated using (private.has_org_role(organization_id, array['owner','admin']::public.organization_role[]));

insert into storage.buckets (id, name, public)
values ('knowledge', 'knowledge', false)
on conflict (id) do update set public = excluded.public;

create policy knowledge_storage_select on storage.objects for select to authenticated
using (bucket_id = 'knowledge' and private.is_org_member((storage.foldername(name))[1]::uuid));

create policy knowledge_storage_insert on storage.objects for insert to authenticated
with check (bucket_id = 'knowledge' and private.is_org_member((storage.foldername(name))[1]::uuid));

create policy knowledge_storage_update on storage.objects for update to authenticated
using (bucket_id = 'knowledge' and private.is_org_member((storage.foldername(name))[1]::uuid))
with check (bucket_id = 'knowledge' and private.is_org_member((storage.foldername(name))[1]::uuid));

create policy knowledge_storage_delete on storage.objects for delete to authenticated
using (bucket_id = 'knowledge' and private.is_org_member((storage.foldername(name))[1]::uuid));
