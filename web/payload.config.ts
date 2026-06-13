import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  localization: {
    locales: ['tr', 'en', 'de', 'fr', 'ru'],
    defaultLocale: 'tr',
    fallback: true,
  },
  editor: lexicalEditor({}),
  collections: [
    {
      slug: 'albums',
      labels: {
        singular: 'Albüm',
        plural: 'Albümler',
      },
      admin: {
        useAsTitle: 'title',
        group: 'GALERİ YÖNETİMİ',
        defaultColumns: ['title', 'date'],
        description: 'Yeni albüm oluşturun ve fotoğrafları albümlere ekleyin.',
      },
      access: { read: () => true },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Albüm Adı',
          required: true,
          localized: true,
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
    },
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    {
      slug: 'newsletter',
      admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'createdAt'],
        components: {
          beforeListTable: [
            '@/components/ExportNewsletterButton',
          ]
        }
      },
      access: {
        create: () => true, // Allow anyone to subscribe
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail Adresi',
          required: true,
          unique: true, // Prevent duplicate subscriptions
        }
      ]
    },
    {
      slug: 'messages',
      labels: {
        singular: 'İletişim Mesajı',
        plural: 'İletişim Mesajları',
      },
      admin: {
        useAsTitle: 'subject',
        defaultColumns: ['name', 'email', 'subject', 'createdAt'],
        group: 'İLETİŞİM YÖNETİMİ',
      },
      access: {
        create: () => true, // Allow public form submissions
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Ad Soyad',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
        },
        {
          name: 'subject',
          type: 'text',
          label: 'Konu',
          required: true,
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Mesaj',
          required: true,
        },
        {
          name: 'ipAddress',
          type: 'text',
          label: 'Gönderen IP',
          admin: {
            readOnly: true,
          }
        }
      ]
    },
    {
      slug: 'members',
      admin: {
        useAsTitle: 'firstName',
        components: {
          beforeListTable: [
            '@/components/ExportMembersButton',
          ]
        }
      },
      access: {
        create: () => true, // Allow public form submissions
      },
      fields: [
        {
          name: 'firstName',
          type: 'text',
          label: 'Adı',
          required: false,
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Soyadı',
          required: false,
        },
        {
          name: 'tcNo',
          type: 'text',
          label: 'TC Kimlik No',
          required: false,
        },
        {
          name: 'birthPlace',
          type: 'text',
          label: 'Doğum Yeri',
        },
        {
          name: 'birthDate',
          type: 'date',
          label: 'Doğum Tarihi',
        },
        {
          name: 'gender',
          type: 'select',
          label: 'Cinsiyet',
          options: [
            { label: 'Kadın', value: 'female' },
            { label: 'Erkek', value: 'male' },
          ]
        },
        {
          name: 'motherName',
          type: 'text',
          label: 'Anne Adı',
        },
        {
          name: 'fatherName',
          type: 'text',
          label: 'Baba Adı',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Yerleşim (İkametgah) Adresi',
          required: false,
        },
        {
          name: 'educationStatus',
          type: 'text',
          label: 'Öğrenim Durumu',
        },
        {
          name: 'workAddress',
          type: 'textarea',
          label: 'İş Adresi',
        },
        {
          name: 'profession',
          type: 'text',
          label: 'Meslek',
        },
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail Adresi',
          required: false,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Cep Telefonu',
          required: false,
        },
        {
          name: 'bloodType',
          type: 'text',
          label: 'Kan Grubu',
        },
        {
          name: 'puzzleCount',
          type: 'select',
          label: 'Şimdiye Kadar Yaptığınız Puzzle Sayısı',
          options: [
            { label: '1 - 5', value: '1-5' },
            { label: '6 - 10', value: '6-10' },
            { label: '11 - 20', value: '11-20' },
            { label: '21 - 50', value: '21-50' },
            { label: '51 - 100', value: '51-100' },
            { label: '100 ve Daha fazla', value: '100+' },
          ]
        },
        {
          name: 'favoritePuzzleBrands',
          type: 'textarea',
          label: 'Tercih Ettiği Puzzle Markaları',
        },
        {
          name: 'kvkkAccepted',
          type: 'checkbox',
          label: 'KVKK Onaylandı',
          required: true,
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Vesikalık Fotoğraf',
          required: false,
        },
        {
          name: 'identityCard',
          type: 'upload',
          relationTo: 'media',
          label: 'Kimlik Görüntüsü',
          required: false,
        },
        {
          name: 'agreementAccepted',
          type: 'checkbox',
          label: 'Sözleşme Onaylandı',
          required: true,
        },
        {
          name: 'ipAddress',
          type: 'text',
          label: 'Başvuru IP Adresi',
          admin: {
            readOnly: true,
          }
        }
      ],
    },
    {
      slug: 'media',
      upload: true,
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],
  globals: [
    {
      slug: 'homePage',
      label: 'Ana Sayfa',
      admin: {
        group: 'SAYFALAR',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Hero (Üst Kısım)',
              fields: [
                {
                  name: 'heroBadgeText',
                  type: 'text',
                  label: 'Üst Etiket (Badge) Metni',
                  defaultValue: "🧩 TÜRKİYE'NİN İLK VE TEK RESMİ PUZZLE DERNEĞİ",
                  localized: true,
                },
                {
                  name: 'heroTitle',
                  type: 'text',
                  label: 'Ana Başlık',
                  required: true,
                  localized: true,
                },
                {
                  name: 'heroSubtitle',
                  type: 'text',
                  label: 'Alt Başlık',
                  required: true,
                  localized: true,
                },
                {
                  name: 'heroDescription',
                  type: 'textarea',
                  label: 'Açıklama Metni',
                  required: true,
                  localized: true,
                },
                {
                  name: 'primaryButtonText',
                  type: 'text',
                  label: 'Birinci Buton Metni',
                  localized: true,
                },
                {
                  name: 'primaryButtonLink',
                  type: 'text',
                  label: 'Birinci Buton Linki',
                },
                {
                  name: 'secondaryButtonText',
                  type: 'text',
                  label: 'İkinci Buton Metni',
                  localized: true,
                },
                {
                  name: 'secondaryButtonLink',
                  type: 'text',
                  label: 'İkinci Buton Linki',
                },
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Hero Görseli',
                  admin: {
                    description: 'Sitenin en üstünde görünen ana görseldir. 1000x1000 px kare görsel önerilir.',
                  }
                },
                {
                  name: 'floatingBadgeIcon',
                  type: 'text',
                  label: 'Yüzen Kutu İkonu (Emoji)',
                  defaultValue: '🏆',
                },
                {
                  name: 'floatingBadgeTitle',
                  type: 'text',
                  label: 'Yüzen Kutu Başlığı',
                  defaultValue: 'Ödüllü Yarışmalar',
                  localized: true,
                },
                {
                  name: 'floatingBadgeSubtitle',
                  type: 'text',
                  label: 'Yüzen Kutu Alt Başlığı',
                  defaultValue: 'Sürpriz hediyeler!',
                  localized: true,
                }
              ]
            },
            {
              label: 'Hakkında Bölümü',
              fields: [
                {
                  name: 'aboutTitle',
                  type: 'text',
                  label: 'Hakkında Başlığı',
                  admin: { description: 'Örn: Avrupa Puzzle Şampiyonası Hakkında (Maks. 60 karakter)' },
                  localized: true,
                },
                {
                  name: 'aboutText1',
                  type: 'textarea',
                  label: 'Hakkında Metni 1 (Kalın Yazı)',
                  admin: { description: 'Hakkında bölümünün girişindeki büyük/kalın metin.' },
                  localized: true,
                },
                {
                  name: 'aboutText2',
                  type: 'textarea',
                  label: 'Hakkında Metni 2 (Normal Yazı)',
                  admin: { description: 'Detaylı açıklamaların olduğu ikinci paragraf.' },
                  localized: true,
                },
                {
                  name: 'aboutBgImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Arka Plan Görseli (Opsiyonel)',
                  admin: { description: 'Dilerseniz buraya bir arka plan görseli yükleyebilirsiniz. Görsel yüklenmezse beyaz arka plan görünür. Öneri: 1920x1080 px karanlık/soluk görsel.' }
                }
              ]
            },
            {
              label: 'Sponsorlar Bölümü',
              fields: [
                {
                  name: 'showSponsors',
                  type: 'checkbox',
                  label: 'Sponsorlar Bölümünü Göster',
                  defaultValue: true,
                },
                {
                  name: 'sponsorsTitle',
                  type: 'text',
                  label: 'Sponsorlar Başlığı',
                  defaultValue: 'Sponsorlar',
                  localized: true,
                },
                {
                  name: 'sponsors',
                  type: 'array',
                  label: 'Sponsor Logoları / Listesi',
                  admin: {
                    initCollapsed: true,
                    description: 'Eğer buraya sponsor eklerseniz, sitenin varsayılan sponsor listesi iptal olur ve sadece buraya ekledikleriniz görünür. İster yeni bir görsel yükleyin, isterseniz eski hazır şablonlardan birini seçin.',
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Sponsor İsmi / Etiketi (Panelde takip etmek için)',
                      required: true,
                      admin: {
                        description: 'Panelde sıralama yaparken hangi sponsor olduğunu kolayca görebilmeniz için bir isim yazın (Örn: Anatolian)',
                      }
                    },
                    {
                      name: 'type',
                      type: 'radio',
                      label: 'Sponsor Tipi',
                      options: [
                        { label: 'Yeni Görsel Yükle', value: 'image' },
                        { label: 'Sistemdeki Hazır Şablon', value: 'preset' }
                      ],
                      defaultValue: 'image',
                    },
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Sponsor Logosu',
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'image',
                      }
                    },
                    {
                      name: 'presetType',
                      type: 'select',
                      label: 'Hazır Sponsor Şablonu Seçin',
                      options: [
                        { label: 'Puzzle Derneği (Logo)', value: 'dernek' },
                        { label: 'Yeşilay (Yatay Metin)', value: 'yesilay_text' },
                        { label: 'Yeşilay Spor Kulübü (Dikey Kutulu)', value: 'yesilay_spor' },
                        { label: 'Anatolian', value: 'anatolian' },
                        { label: 'ECJP', value: 'ecjp' },
                        { label: 'The Idea Factory', value: 'ideafactory' },
                        { label: 'Özensan A.Ş.', value: 'ozensan' },
                      ],
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'preset',
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      slug: 'historyPage',
      label: 'Tarihçe',
      admin: {
        group: 'SAYFALAR',
      },
      access: { read: () => true },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Sayfa Başlığı',
          defaultValue: 'Tarihçemiz',
          required: true,
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Alt Başlık / Açıklama',
          localized: true,
        },
        {
          name: 'events',
          type: 'array',
          label: 'Zaman Çizelgesi (Tarihçe Adımları)',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'year',
              type: 'text',
              label: 'Tarih (Örn: Aralık 2014)',
              required: true,
              localized: true,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Etkinlik Başlığı',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Etkinlik Detayı',
              required: true,
              localized: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Görsel (Opsiyonel)',
            }
          ]
        }
      ]
    },
    {
      slug: 'pastCompetitionsPage',
      label: 'Geçmiş Yarışmalar',
      admin: {
        group: 'SAYFALAR',
      },
      access: { read: () => true },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Sayfa Başlığı',
          defaultValue: 'Geçmiş Yarışmalar',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Sayfa Açıklaması',
          localized: true,
        },
        {
          name: 'competitions',
          type: 'array',
          label: 'Yarışma ve İçerik Blokları',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'type',
              type: 'radio',
              label: 'Blok Tipi',
              options: [
                { label: 'Detaylı Anlatım (Paragraflar ve Görseller)', value: 'details' },
                { label: 'Kazananlar Listesi', value: 'winners' },
                { label: 'Sadece Görsel / Tablo', value: 'image' },
              ],
              defaultValue: 'details',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Başlık',
              localized: true,
            },
            // Details fields
            {
              name: 'paragraphs',
              type: 'array',
              label: 'Paragraflar',
              admin: { condition: (_, d) => d?.type === 'details' },
              fields: [
                { name: 'text', type: 'textarea', label: 'Paragraf Metni', localized: true }
              ]
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galeri Görselleri',
              admin: { condition: (_, d) => d?.type === 'details' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media' }
              ]
            },
            // Winners fields
            {
              name: 'winnersList',
              type: 'array',
              label: 'Dereceye Girenler Listesi',
              admin: { condition: (_, d) => d?.type === 'winners' },
              fields: [
                { name: 'name', type: 'text', label: 'Kişi ve Derece/Süre', localized: true }
              ]
            },
            {
              name: 'specialAwards',
              type: 'array',
              label: 'Özel Ödüller',
              admin: { condition: (_, d) => d?.type === 'winners' },
              fields: [
                { name: 'awardName', type: 'text', label: 'Ödül Adı', localized: true },
                { name: 'winner', type: 'text', label: 'Kazanan Kişi', localized: true }
              ]
            },
            // Image fields
            {
              name: 'singleImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Tekli Görsel / Tablo',
              admin: { condition: (_, d) => d?.type === 'image' },
            },
            {
              name: 'imageDescription',
              type: 'textarea',
              label: 'Görsel Açıklaması',
              admin: { condition: (_, d) => d?.type === 'image' },
              localized: true,
            }
          ]
        }
      ]
    },
    {
      slug: 'bylawsPage',
      label: 'Tüzük',
      admin: { group: 'SAYFALAR' },
      access: { read: () => true },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Sayfa Başlığı',
          defaultValue: 'Dernek Tüzüğü',
          required: true,
          localized: true,
        },
        {
          name: 'blocks',
          type: 'array',
          label: 'Tüzük İçeriği (Maddeler / Alt Başlıklar)',
          fields: [
            {
              name: 'blockType',
              type: 'select',
              label: 'İçerik Tipi',
              options: [
                { label: 'Madde (Örn: Madde 1)', value: 'madde' },
                { label: 'Alt Başlık', value: 'section_title' },
                { label: 'Liste Elemanı (Örn: a) ...)', value: 'list_item' },
                { label: 'Normal Paragraf', value: 'paragraph' }
              ],
              required: true,
            },
            {
              name: 'maddeNo',
              type: 'text',
              label: 'Madde Numarası (Örn: 1)',
              admin: { condition: (_, siblingData) => siblingData?.blockType === 'madde' }
            },
            {
              name: 'listMarker',
              type: 'text',
              label: 'Liste İşareti (Örn: a)',
              admin: { condition: (_, siblingData) => siblingData?.blockType === 'list_item' }
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Metin / İçerik',
              required: true,
              localized: true,
            }
          ]
        }
      ]
    },
    {
      slug: 'galleryPage',
      label: 'Galeri Sayfa Ayarları',
      admin: { group: 'GALERİ YÖNETİMİ' },
      access: { read: () => true },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Sayfa Başlığı',
          defaultValue: 'DERNEK GALERİSİ',
          required: true,
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Alt Başlık / Açıklama',
          defaultValue: 'Geçmiş yarışmalardan ve etkinliklerimizden unutulmaz anlar.',
          localized: true,
        },
        {
          name: 'photos',
          type: 'array',
          label: 'Galeri Fotoğrafları',
          admin: {
            components: {
              Field: '/src/components/admin/GalleryGrid#default',
            }
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Fotoğraf',
              required: true,
            },
            {
              name: 'album',
              type: 'relationship',
              relationTo: 'albums',
              label: 'Albüm',
            },
          ]
        },
        
      ]
    },
    {
      slug: 'membershipPage',
      label: 'Üyelik Formu',
      admin: { group: 'SAYFALAR' },
      access: { read: () => true },
      fields: [
        {
          name: 'formSettings',
          type: 'array',
          label: 'Form Alanları Ayarları (Görünürlük & Zorunluluk)',
          admin: {
            description: 'Buraya formda göstermek istediğiniz alanları ekleyin. Eklenmeyen alanlar formda GİZLENECEKTİR.',
          },
          fields: [
            {
              name: 'fieldName',
              type: 'select',
              label: 'Alan Adı',
              required: true,
              options: [
                { label: 'TC Kimlik No', value: 'tcNo' },
                { label: 'Doğum Tarihi', value: 'birthDate' },
                { label: 'Cinsiyet', value: 'gender' },
                { label: 'Kan Grubu', value: 'bloodType' },
                { label: 'Anne Adı', value: 'motherName' },
                { label: 'Baba Adı', value: 'fatherName' },
                { label: 'Doğum Yeri', value: 'birthPlace' },
                { label: 'Cep Telefonu', value: 'phone' },
                { label: 'E-Mail Adresi', value: 'email' },
                { label: 'Yerleşim Yeri Adresi', value: 'address' },
                { label: 'İş Adresi', value: 'workAddress' },
                { label: 'Meslek', value: 'profession' },
                { label: 'Öğrenim Durumu', value: 'educationStatus' },
                { label: 'Puzzle Sayısı', value: 'puzzleCount' },
                { label: 'Favori Markalar', value: 'favoritePuzzleBrands' },
                { label: 'Vesikalık Fotoğraf', value: 'photo' },
                { label: 'Kimlik Görüntüsü', value: 'identityCard' },
              ]
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Zorunlu Olsun mu?',
              defaultValue: false,
            }
          ]
        },
        {
          name: 'title',
          type: 'text',
          label: 'Sayfa Başlığı',
          defaultValue: 'Dernek Üyelik Formu',
          required: true,
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Alt Başlık / Açıklama',
          defaultValue: 'Ailemize katılmak için aşağıdaki formu eksiksiz doldurunuz.',
          localized: true,
        }
      ]
    },
    {
      slug: 'contactPage',
      label: 'İletişim',
      admin: { group: 'SAYFALAR' },
      access: { read: () => true },
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Adres',
          localized: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon Numarası',
        },
        {
          name: 'email',
          type: 'text',
          label: 'E-Posta Adresi',
        },
        {
          name: 'facebookUrl',
          type: 'text',
          label: 'Facebook Linki',
        }
      ]
    }
  ],
  secret: process.env.PAYLOAD_SECRET || 'SOME_SECRET_KEY',
  db: sqliteAdapter({
    client: {
      url: 'file:./payload.db',
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
