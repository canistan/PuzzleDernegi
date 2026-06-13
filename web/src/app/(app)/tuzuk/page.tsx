import { Metadata } from 'next';
import { tuzukData } from './tuzukData';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Dernek Tüzüğü | Puzzle Derneği',
};

export default async function Tuzuk() {
  const payload = await getPayload({ config: configPromise });
  const bylawsPage = await payload.findGlobal({
    slug: 'bylawsPage',
  });

  const title = bylawsPage.title || 'Dernek Tüzüğü';
  
  // Use payload blocks if they exist, otherwise fallback to tuzukData
  const hasPayloadBlocks = bylawsPage.blocks && bylawsPage.blocks.length > 0;
  
  // Normalize payload blocks to match the old structure for rendering
  const displayBlocks = hasPayloadBlocks
    ? bylawsPage.blocks!.map((block: any) => ({
        type: block.blockType,
        content: block.content,
        maddeNo: block.maddeNo,
        listMarker: block.listMarker
      }))
    : tuzukData;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            YAPBOZ DERNEĞİ
          </h1>
          <div className="h-1 w-24 bg-[var(--primary)] mx-auto rounded-full mb-4"></div>
          <h2 className="text-2xl font-semibold text-[#475569]">{title}</h2>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="p-8 sm:p-12 md:p-16">
            <div className="space-y-8">
              {displayBlocks.map((item: any, index: number) => {
                if (item.type === 'main_title') return null; // Handled in hero
                
                if (item.type === 'section_title') {
                  const cleanTitle = item.content.replace(/<\/?b>|<\/?h3>/gi, '').trim();
                  return (
                    <div key={index} className="pt-8 pb-2 border-b-2 border-[#F1F5F9] mt-8">
                      <h3 className="text-xl md:text-2xl font-bold text-[#2B3A67]">
                        {cleanTitle}
                      </h3>
                    </div>
                  );
                }
                
                if (item.type === 'madde') {
                  let c = item.content;
                  if(c.startsWith('</b>')) c = c.substring(4).trim();
                  
                  return (
                    <div key={index} className="bg-[#F8FAFC] rounded-xl p-6 md:p-8 border-l-4 border-[#FF6B35] shadow-sm mt-8 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                      <h4 className="text-lg font-extrabold text-[#0F172A] mb-3 flex items-center">
                        <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-md text-sm mr-3">Madde {item.maddeNo}</span>
                      </h4>
                      <p className="text-[#334155] text-lg leading-relaxed text-justify whitespace-pre-line">
                        {c}
                      </p>
                    </div>
                  );
                }
                
                if (item.type === 'list_item') {
                  return (
                    <div key={index} className="flex items-start mt-4 ml-2 md:ml-6 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F1F5F9] text-[#FF6B35] font-bold flex items-center justify-center mr-4 mt-1 group-hover:bg-[#FF6B35] group-hover:text-white transition-colors">
                        {item.listMarker?.replace('.', '') || ''}
                      </div>
                      <div className="flex-1 text-[#475569] text-lg leading-relaxed pt-1 whitespace-pre-line">
                        {item.content}
                      </div>
                    </div>
                  );
                }
                
                if (item.type === 'paragraph') {
                  return (
                    <p key={index} className="text-[#475569] text-lg leading-relaxed text-justify mt-4 whitespace-pre-line">
                      {item.content}
                    </p>
                  );
                }
                
                return null;
              })}
            </div>
          </div>
        </div>
        
        {/* Footer info for document */}
        <div className="mt-12 text-center text-[#64748B] text-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p>Son Güncelleme: {new Date().getFullYear()}</p>
          <p>Yapboz Derneği Resmi Tüzüğüdür. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  );
}
