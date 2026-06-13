import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    const data = await req.json();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ error: 'Lütfen zorunlu alanları doldurun.' }, { status: 400 });
    }

    const payloadData = {
      ...data,
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Bilinmiyor',
    };

    const message = await payload.create({
      collection: 'messages',
      data: payloadData,
      overrideAccess: true,
    });

    return NextResponse.json({ success: true, messageId: message.id }, { status: 201 });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Mesaj gönderilirken bir hata oluştu.' }, { status: 500 });
  }
}
