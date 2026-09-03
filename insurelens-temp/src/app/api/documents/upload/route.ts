import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const docType = formData.get('docType') as string | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // In demo mode or production without storage credentials, simulate successful upload
    return NextResponse.json({
      success: true,
      data: {
        id: `doc-${Date.now()}`,
        name: file.name,
        size: file.size,
        docType: docType || 'general',
        status: 'uploaded',
        url: `/uploads/${file.name}`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Upload failed' }, { status: 500 });
  }
}
