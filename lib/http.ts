import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
    public readonly code = 'BAD_REQUEST',
  ) {
    super(message);
  }
}

export function jsonError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: 'Validation failed', code: 'VALIDATION_ERROR', issues: error.issues }, { status: 422 });
  }
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message, code: error.code }, { status: error.status });
  }
  console.error(error);
  return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 });
}
