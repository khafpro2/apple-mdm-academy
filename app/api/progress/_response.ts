import { NextResponse } from 'next/server';

export class ProgressServiceUnavailable extends Error {
  constructor(message = 'La progression cloud n\'est pas configurée.') {
    super(message);
    this.name = 'ProgressServiceUnavailable';
  }
}

export function progressServiceUnavailable() {
  return NextResponse.json(
    { error: 'La progression cloud n\'est pas configurée.' },
    { status: 503 },
  );
}

export function progressError(error: unknown) {
  if (error instanceof ProgressServiceUnavailable) {
    return progressServiceUnavailable();
  }

  console.error('Progress API error', error);
  return NextResponse.json(
    { error: 'La progression cloud est temporairement indisponible.' },
    { status: 503 },
  );
}
