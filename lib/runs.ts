import 'server-only';
import { AppError } from '@/lib/http';
import { requireOrganization } from '@/lib/auth';
import { generateWithProvider, type AIProviderName } from '@/lib/ai';
import { executeAgentSchema } from '@/lib/validation/agent';

export async function listRuns(organizationId: string, limit = 50) {
  const { supabase } = await requireOrganization(organizationId);
  const { data, error } = await supabase.from('agent_runs').select('*, agents(name, slug)').eq('organization_id', organizationId).order('created_at', { ascending: false }).limit(Math.min(Math.max(limit, 1), 100));
  if (error) throw error;
  return data ?? [];
}

export async function executeAgent(input: unknown) {
  const parsed = executeAgentSchema.parse(input);
  const { supabase, user } = await requireOrganization(parsed.organizationId);
  const { data: agent, error: agentError } = await supabase.from('agents').select('*').eq('organization_id', parsed.organizationId).eq('id', parsed.agentId).maybeSingle();
  if (agentError) throw agentError;
  if (!agent) throw new AppError('Agent not found', 404, 'AGENT_NOT_FOUND');
  if (agent.status !== 'active') throw new AppError('Agent is not active', 409, 'AGENT_NOT_ACTIVE');

  const { data: run, error: runError } = await supabase.from('agent_runs').insert({
    organization_id: parsed.organizationId,
    agent_id: agent.id,
    project_id: agent.project_id,
    triggered_by: user.id,
    status: 'running',
    input: { prompt: parsed.prompt },
    provider: agent.provider,
    model: agent.model,
    started_at: new Date().toISOString(),
  }).select('*').single();
  if (runError) throw runError;

  await supabase.from('agent_messages').insert({ organization_id: parsed.organizationId, run_id: run.id, role: 'user', content: parsed.prompt });

  try {
    const result = await generateWithProvider(agent.provider as AIProviderName, {
      model: agent.model,
      temperature: agent.temperature ?? undefined,
      maxOutputTokens: agent.max_output_tokens ?? undefined,
      messages: [
        ...(agent.system_prompt ? [{ role: 'system' as const, content: agent.system_prompt }] : []),
        { role: 'user' as const, content: parsed.prompt },
      ],
    });

    await supabase.from('agent_messages').insert({ organization_id: parsed.organizationId, run_id: run.id, role: 'assistant', content: result.text });
    const completedAt = new Date().toISOString();
    const { data: completed, error: completeError } = await supabase.from('agent_runs').update({
      status: 'completed',
      output: { text: result.text },
      input_tokens: result.inputTokens ?? null,
      output_tokens: result.outputTokens ?? null,
      completed_at: completedAt,
    }).eq('id', run.id).select('*').single();
    if (completeError) throw completeError;

    await supabase.from('usage_events').insert({
      organization_id: parsed.organizationId,
      user_id: user.id,
      agent_id: agent.id,
      run_id: run.id,
      provider: result.provider,
      model: result.model,
      input_tokens: result.inputTokens ?? 0,
      output_tokens: result.outputTokens ?? 0,
    });

    await supabase.from('inbox_items').insert({
      organization_id: parsed.organizationId,
      agent_id: agent.id,
      run_id: run.id,
      project_id: agent.project_id,
      type: 'run_result',
      title: `${agent.name} completed a run`,
      body: result.text.slice(0, 2000),
      status: 'unread',
    });

    return { run: completed, text: result.text };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown provider error';
    await supabase.from('agent_runs').update({ status: 'failed', error: message, completed_at: new Date().toISOString() }).eq('id', run.id);
    throw error;
  }
}
