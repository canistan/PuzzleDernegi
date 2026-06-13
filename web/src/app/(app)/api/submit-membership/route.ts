import { getPayload } from 'payload'
import configPromise from '../../../../../payload.config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Parse the multipart form data
    const formData = await req.formData();
    
    // Extract files
    const photoFile = formData.get('photo') as File | null;
    const identityFile = formData.get('identityCard') as File | null;
    
    
    const membershipPage = await payload.findGlobal({ slug: 'membershipPage' });
    const settings = membershipPage.formSettings || [];
    
    // Helper to check if a field is required
    const isRequired = (name: string) => {
      const field = settings.find((f: any) => f.fieldName === name);
      return field ? field.required : false;
    };

    if (isRequired('photo') && !photoFile) {
      return NextResponse.json({ errors: [{ message: 'Vesikalık fotoğraf yüklenmesi zorunludur.' }] }, { status: 400 });
    }
    
    if (isRequired('identityCard') && !identityFile) {
      return NextResponse.json({ errors: [{ message: 'Kimlik görüntüsü yüklenmesi zorunludur.' }] }, { status: 400 });
    }


    // Convert File objects to buffers with names for Payload
    
    let photoMediaId = null;
    if (photoFile && photoFile.size > 0) {
      const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
      const photoMedia = await payload.create({
        collection: 'media',
        data: { alt: `Vesikalık - ${formData.get('firstName')} ${formData.get('lastName')}` },
        file: { data: photoBuffer, name: photoFile.name, mimetype: photoFile.type, size: photoFile.size },
        overrideAccess: true,
      });
      photoMediaId = photoMedia.id;
    }

    let identityMediaId = null;
    if (identityFile && identityFile.size > 0) {
      const identityBuffer = Buffer.from(await identityFile.arrayBuffer());
      const identityMedia = await payload.create({
        collection: 'media',
        data: { alt: `Kimlik - ${formData.get('firstName')} ${formData.get('lastName')}` },
        file: { data: identityBuffer, name: identityFile.name, mimetype: identityFile.type, size: identityFile.size },
        overrideAccess: true,
      });
      identityMediaId = identityMedia.id;
    }


    // Extract text fields
    const data: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== 'photo' && key !== 'identityCard') {
        data[key] = value;
      }
    }

    // Format boolean values correctly for Payload
    const payloadData = {
      ...data,
      kvkkAccepted: data.kvkkAccepted === 'true',
      agreementAccepted: data.agreementAccepted === 'true',
      photo: photoMediaId,
      identityCard: identityMediaId,
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Bilinmiyor',
    };

    // Create the member record
    const member = await payload.create({
      collection: 'members',
      data: payloadData as any,
      overrideAccess: true, // Override just in case
    });

    return NextResponse.json({ success: true, memberId: member.id });
  } catch (error: any) {
    console.error('Membership submission error:', error);
    return NextResponse.json({ 
      errors: [{ message: error.message || 'Kayıt sırasında sunucu tarafında bir hata oluştu.' }] 
    }, { status: 500 });
  }
}
