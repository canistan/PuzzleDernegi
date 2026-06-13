import React from 'react';

export default function ExportMembersButton() {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
      <a 
        href="/api/export/members" 
        download 
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--theme-elevation-800)',
          color: 'var(--theme-elevation-0)',
          borderRadius: '0.25rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          transition: 'background-color 0.2s',
          border: '1px solid var(--theme-elevation-800)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Üyeleri Excel Olarak İndir (CSV)
      </a>
    </div>
  );
}
