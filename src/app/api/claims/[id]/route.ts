import { NextResponse } from 'next/server';
import { DEMO_ANALYSIS } from '@/lib/demoData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({
    success: true,
    data: {
      ...DEMO_ANALYSIS,
      claimId: id,
    },
  });
}
