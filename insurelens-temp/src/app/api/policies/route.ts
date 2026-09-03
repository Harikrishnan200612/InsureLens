import { NextResponse } from 'next/server';
import { DEMO_POLICY } from '@/lib/demoData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [DEMO_POLICY],
  });
}
