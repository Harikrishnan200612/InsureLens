import { NextResponse } from 'next/server';
import { DEMO_POLICY } from '@/lib/demoData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await params;
  return NextResponse.json({
    success: true,
    data: DEMO_POLICY,
  });
}
