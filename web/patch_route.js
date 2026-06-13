const fs = require('fs');

const routePath = 'src/app/(app)/api/submit-membership/route.ts';
let content = fs.readFileSync(routePath, 'utf8');

const newValidation = `
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
`;

content = content.replace(
    "if (!photoFile || !identityFile) {\n      return NextResponse.json({ errors: [{ message: 'Vesikalık fotoğraf ve kimlik görüntüsü zorunludur.' }] }, { status: 400 });\n    }",
    newValidation
);

// We also need to make photoMedia and identityMedia optional and only create if files are provided
const mediaCreation = `
    let photoMediaId = null;
    if (photoFile && photoFile.size > 0) {
      const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
      const photoMedia = await payload.create({
        collection: 'media',
        data: { alt: \`Vesikalık - \${formData.get('firstName')} \${formData.get('lastName')}\` },
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
        data: { alt: \`Kimlik - \${formData.get('firstName')} \${formData.get('lastName')}\` },
        file: { data: identityBuffer, name: identityFile.name, mimetype: identityFile.type, size: identityFile.size },
        overrideAccess: true,
      });
      identityMediaId = identityMedia.id;
    }
`;

// Replace the old media creation blocks
content = content.replace(
    /const photoBuffer = Buffer.from[^]*overrideAccess: true, \/\/ Bypass public upload restrictions\n    \}\);/m,
    mediaCreation
);

// Update payloadData to use the new IDs and handle nulls
content = content.replace(
    /photo: photoMedia\.id,\n\s*identityCard: identityMedia\.id,/,
    "photo: photoMediaId,\n      identityCard: identityMediaId,"
);

fs.writeFileSync(routePath, content);
console.log("Route patched!");
