import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dernek Tüzüğü | Puzzle Derneği',
};

export default function Tuzuk() {
  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>DERNEK TÜZÜĞÜ</h1>
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
        }}>
          <p className="text-muted text-center">
            Dernek tüzüğümüze dair içerikler yakında bu sayfada yer alacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}
