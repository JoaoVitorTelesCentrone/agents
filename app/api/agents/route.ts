import { NextResponse } from 'next/server';
import { createAgent, listAgents } from '@/lib/agents';
import { jsonError } from '@/lib/http';

export async function GET(request: Request) {
  try {
    const organizationId = new URL(request.url).searchParams.get('organizationId');
    if (!organizationId) return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
    return NextResponse.json({ data: await listAgents(organizationId) });
  } catch (error) { return jsonError(error); }
}

export async function POST(request: Request) {
  try { return NextResponse.json({ data: await createAgent(await request.json()) }, { status: 201 }); } catch (error) { return jsonError(error); }
}
