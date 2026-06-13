const fs = require('fs');

const configPath = 'payload.config.ts';
let content = fs.readFileSync(configPath, 'utf8');

// Add Albums collection before members
const albumsCollection = `
    {
      slug: 'albums',
      label: 'Albümler (Galeri)',
      admin: {
        useAsTitle: 'title',
        group: 'İÇERİKLER',
        defaultColumns: ['title', 'date'],
      },
      access: { read: () => true },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Albüm Adı',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          label: 'Etkinlik Tarihi',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd MMM yyyy',
            },
          },
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Albüm Kapak Fotoğrafı',
          required: true,
        },
        {
          name: 'images',
          type: 'relationship',
          relationTo: 'media',
          hasMany: true,
          label: 'Albüm Fotoğrafları (Toplu Seçim)',
        }
      ]
    },`;

content = content.replace("collections: [", "collections: [" + albumsCollection);

// Remove images array from galleryPage
// Looking for:
/*
        {
          name: 'images',
          type: 'relationship',
          relationTo: 'media',
          hasMany: true,
          label: 'Galeri Fotoğrafları',
        }
*/
content = content.replace(/\{\s*name:\s*'images',\s*type:\s*'relationship',\s*relationTo:\s*'media',\s*hasMany:\s*true,\s*label:\s*'Galeri Fotoğrafları',?\s*\}/, '');

fs.writeFileSync(configPath, content);
console.log("Patched payload.config.ts");
