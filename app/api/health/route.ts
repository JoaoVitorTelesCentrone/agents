import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const required = {
    supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabasePublishableKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    supabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };

  const ready = Object.values(required).every(Boolean);

  return NextResponse.json(
    {
      status: ready ? 'ok' : 'configuration_required',
      service: 'agents-os',
      checks: required,
      timestamp: new Date().toISOString(),
    },
    { status: ready ? 200 : 503 },
  );
}
