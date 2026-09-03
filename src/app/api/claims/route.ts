import { NextResponse } from 'next/server';
import { DEMO_CLAIMS_HISTORY, DEMO_ANALYSIS } from '@/lib/demoData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: DEMO_CLAIMS_HISTORY,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Claim recorded',
      data: {
        id: `CLM-2026-${Date.now().toString().slice(-3)}`,
        ...body,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
