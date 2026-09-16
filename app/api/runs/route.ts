import { NextResponse } from 'next/server';
import { executeAgent, listRuns } from '@/lib/runs';
import { jsonError } from '@/lib/http';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const organizationId = url.searchParams.get('organizationId');
    const limit = Number(url.searchParams.get('limit') || '50');
    if (!organizationId) return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
    return NextResponse.json({ data: await listRuns(organizationId, limit) });
  } catch (error) { return jsonError(error); }
}

export async function POST(request: Request) {
  try { return NextResponse.json({ data: await executeAgent(await request.json()) }, { status: 201 }); } catch (error) { return jsonError(error); }
}
