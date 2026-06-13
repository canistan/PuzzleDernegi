import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '../../../../../../payload.config';

export async function GET(req: Request, context: { params: Promise<{ collection: string }> | { collection: string } }) {
  const params = await context.params;
  const collection = params.collection;
  
  if (collection !== 'members' && collection !== 'newsletter') {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: collection as any,
      limit: 50000, // Export all records
    });

    const docs = result.docs;
    if (docs.length === 0) {
      return new NextResponse('No veriler (Kayıt bulunamadı)', { status: 404 });
    }

    // Prepare CSV headers, ignore unnecessary payload internal fields
    const ignoredKeys = ['id', 'salt', 'hash', '_strategy', 'loginAttempts', 'lockUntil'];
    const headers = Object.keys(docs[0]).filter(k => !ignoredKeys.includes(k));
    
    const rows = docs.map(doc => {
      return headers.map(k => {
        let val = (doc as any)[k];
        if (val === null || val === undefined) val = '';
        if (typeof val === 'object') val = JSON.stringify(val);
        // Escape quotes and format for CSV
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',');
    });

    // Add UTF-8 BOM so Excel opens it correctly with Turkish characters
    const bom = '\uFEFF';
    const csv = bom + [headers.join(','), ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${collection}-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
