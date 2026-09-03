import { NextResponse } from 'next/server';
import { calculateClaim } from '@/lib/calculateClaim';
import { DEMO_POLICY, DEMO_BILL } from '@/lib/demoData';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const policy = body.policy || DEMO_POLICY;
    const bill = body.bill || DEMO_BILL;

    // Run deterministic TypeScript calculation engine
    const calculationResult = calculateClaim({
      policy,
      bill,
    });

    const analysisId = `CLM-2026-${Date.now().toString().slice(-4)}`;

    return NextResponse.json({
      success: true,
      data: {
        id: analysisId,
        claimId: analysisId,
        status: 'completed',
        policyData: policy,
        billData: bill,
        result: calculationResult,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Analysis failed' }, { status: 500 });
  }
}
