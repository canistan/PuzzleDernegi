'use client'

import React, { useCallback, useEffect, useState, useRef } from 'react'

interface MediaDoc {
  id: string | number
  url?: string
  thumbnailURL?: string
  alt?: string
  filename?: string
}

interface AlbumDoc {
  id: string | number
  title: string
}

interface PhotoItem {
  id?: string
  image: string | number | MediaDoc
  album?: string | number | AlbumDoc | null
}

const GalleryGridField: React.FC<any> = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [albums, setAlbums] = useState<AlbumDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchData = useCallback(async () => {
    try {
      const [galleryRes, albumsRes] = await Promise.all([
        fetch('/api/globals/galleryPage?depth=1', { cache: 'no-store' }),
        fetch('/api/albums?limit=100', { cache: 'no-store' }),
      ])
      const galleryData = await galleryRes.json()
      const albumsData = await albumsRes.json()
      setPhotos(galleryData.photos || [])
      setAlbums(albumsData.docs || [])
    } catch (err) {
      console.error('Fetch error', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const savePhotos = useCallback(async (updatedPhotos: PhotoItem[]) => {
    setSaving(true)
    try {
      // Convert populated objects back to IDs for saving
      const cleanPhotos = updatedPhotos.map(p => ({
        id: p.id,
        image: typeof p.image === 'object' ? p.image.id : p.image,
        album: p.album ? (typeof p.album === 'object' ? (p.album as AlbumDoc).id : p.album) : null,
      }))

      await fetch('/api/globals/galleryPage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: cleanPhotos }),
      })

      // Refetch to get populated data
      await fetchData()
    } catch (err) {
      console.error('Save error', err)
    } finally {
      setSaving(false)
    }
  }, [fetchData])

  const handleAlbumChange = useCallback(async (index: number, albumId: string) => {
    const updated = [...photos]
    updated[index] = {
      ...updated[index],
      album: albumId ? albumId : null,
    }
    setPhotos(updated)
    await savePhotos(updated)
  }, [photos, savePhotos])

  const handleRemove = useCallback(async (index: number) => {
    const updated = [...photos]
    updated.splice(index, 1)
    setPhotos(updated)
    await savePhotos(updated)
  }, [photos, savePhotos])

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)

    const newPhotos = [...photos]
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', `Galeri - ${file.name}`)
      try {
        const res = await fetch('/api/media', { method: 'POST', body: formData })
        if (res.ok) {
          const result = await res.json()
          newPhotos.push({ image: result.doc, album: null })
        }
      } catch (err) {
        console.error('Upload failed', err)
      }
    }
    setPhotos(newPhotos)
    await savePhotos(newPhotos)
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [photos, savePhotos])

  const getThumbUrl = (photo: PhotoItem): string | null => {
    if (typeof photo.image === 'object' && photo.image?.url) {
      return photo.image.thumbnailURL || photo.image.url
    }
    return null
  }

  const getAlbumId = (photo: PhotoItem): string => {
    if (!photo.album) return ''
    if (typeof photo.album === 'object') return String((photo.album as AlbumDoc).id)
    return String(photo.album)
  }

  if (loading) {
    return <div style={{ padding: 20, color: '#666', textAlign: 'center' }}>Galeri yükleniyor...</div>
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: '12px 16px',
        background: '#f8f9fa',
        borderRadius: 8,
        border: '1px solid #e9ecef',
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>
            📸 Galeri Fotoğrafları
          </div>
          <span style={{ fontSize: 12, color: '#888' }}>
            {photos.length} fotoğraf {saving && ' · Kaydediliyor...'}
          </span>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              padding: '8px 18px',
              background: uploading ? '#999' : '#FF6B35',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: uploading ? 'wait' : 'pointer',
            }}
          >
            {uploading ? '⏳ Yükleniyor...' : '+ Fotoğraf Ekle'}
          </button>
        </div>
      </div>

      {photos.length === 0 ? (
        <div style={{
          padding: 40,
          textAlign: 'center',
          color: '#aaa',
          border: '2px dashed #ddd',
          borderRadius: 12,
        }}>
          Henüz fotoğraf eklenmemiş. Yukarıdaki butonla fotoğraf yükleyin.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 10,
          maxHeight: 650,
          overflowY: 'auto',
          padding: 4,
        }}>
          {photos.map((photo, index) => {
            const url = getThumbUrl(photo)
            const albumId = getAlbumId(photo)

            return (
              <div key={photo.id || index} style={{
                position: 'relative',
                borderRadius: 8,
                overflow: 'hidden',
                border: '2px solid',
                borderColor: albumId ? '#4caf50' : '#dee2e6',
                background: '#fafafa',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                {url ? (
                  <img
                    src={url}
                    alt=""
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ccc',
                    fontSize: 24,
                    background: '#f0f0f0',
                  }}>
                    📷
                  </div>
                )}

                <select
                  value={albumId}
                  onChange={(e) => handleAlbumChange(index, e.target.value)}
                  style={{
                    width: '100%',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '8px 20px 8px 8px',
                    border: 'none',
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    background: albumId 
                      ? '#4caf50 url("data:image/svg+xml;utf8,<svg fill=\'%23ffffff\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 4px center'
                      : '#e0e0e0 url("data:image/svg+xml;utf8,<svg fill=\'%23333333\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 4px center',
                    backgroundSize: '16px',
                    color: albumId ? '#fff' : '#333',
                    cursor: 'pointer',
                    outline: 'none',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                >
                  <option value="">Albüm seç...</option>
                  {albums.map(a => {
                    const titleStr = typeof a.title === 'string' ? a.title : (a.title as any)?.tr || (a.title as any)?.en || 'İsimsiz Albüm';
                    return <option key={a.id} value={String(a.id)}>{titleStr}</option>
                  })}
                </select>

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  style={{
                    position: 'absolute',
                    top: 3,
                    right: 3,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(220,53,69,0.85)',
                    color: '#fff',
                    border: 'none',
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                  }}
                  title="Fotoğrafı kaldır"
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default GalleryGridField
