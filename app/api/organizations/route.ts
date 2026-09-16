import { NextResponse } from 'next/server';
import { createOrganization, listOrganizations } from '@/lib/organizations';
import { jsonError } from '@/lib/http';

export async function GET() {
  try { return NextResponse.json({ data: await listOrganizations() }); } catch (error) { return jsonError(error); }
}

export async function POST(request: Request) {
  try { return NextResponse.json({ data: await createOrganization(await request.json()) }, { status: 201 }); } catch (error) { return jsonError(error); }
}
