import { NextResponse } from 'next/server';
import { DEMO_POLICY } from '@/lib/demoData';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    // Returns structured policy rules with clause references
    return NextResponse.json({
      success: true,
      data: DEMO_POLICY,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Extraction failed' }, { status: 500 });
  }
}
