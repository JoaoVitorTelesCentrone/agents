import { NextResponse } from 'next/server';
import { deleteAgent, getAgent, updateAgent } from '@/lib/agents';
import { jsonError } from '@/lib/http';

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const organizationId = new URL(request.url).searchParams.get('organizationId');
    if (!organizationId) return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
    return NextResponse.json({ data: await getAgent(organizationId, id) });
  } catch (error) { return jsonError(error); }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const organizationId = body.organizationId;
    if (!organizationId) return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
    const { organizationId: _, ...patch } = body;
    return NextResponse.json({ data: await updateAgent(organizationId, id, patch) });
  } catch (error) { return jsonError(error); }
}

export async function DELETE(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const organizationId = new URL(request.url).searchParams.get('organizationId');
    if (!organizationId) return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
    await deleteAgent(organizationId, id);
    return new NextResponse(null, { status: 204 });
  } catch (error) { return jsonError(error); }
}
