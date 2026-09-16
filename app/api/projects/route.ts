import { NextResponse } from 'next/server';
import { createProject, listProjects } from '@/lib/projects';
import { jsonError } from '@/lib/http';

export async function GET(request: Request) {
  try {
    const organizationId = new URL(request.url).searchParams.get('organizationId');
    if (!organizationId) return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
    return NextResponse.json({ data: await listProjects(organizationId) });
  } catch (error) { return jsonError(error); }
}

export async function POST(request: Request) {
  try { return NextResponse.json({ data: await createProject(await request.json()) }, { status: 201 }); } catch (error) { return jsonError(error); }
}
