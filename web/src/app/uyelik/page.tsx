import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Üyelik Formu | Puzzle Derneği',
};

export default function Uyelik() {
  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>ÜYELİK FORMU</h1>
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Uyelik Form Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/uyeformnew.jpg" 
            alt="Üyelik Formu" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
}
