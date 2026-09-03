import { NextResponse } from 'next/server';
import { DEMO_BILL } from '@/lib/demoData';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({
      success: true,
      data: DEMO_BILL,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Bill analysis failed' }, { status: 500 });
  }
}
