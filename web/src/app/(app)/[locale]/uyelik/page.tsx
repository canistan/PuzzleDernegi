import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import UyelikClientForm from './UyelikClientForm';

export const metadata: Metadata = {
  title: 'Üyelik Formu | Puzzle Derneği',
};

export default async function Uyelik(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const payload = await getPayload({ config: configPromise });
  const membershipPage = await payload.findGlobal({
    slug: 'membershipPage',
    locale: locale as any,
  });

  return (
    <UyelikClientForm 
      title={membershipPage.title || 'Dernek Üyelik Formu'} 
      subtitle={membershipPage.subtitle || 'Ailemize katılmak için aşağıdaki formu eksiksiz doldurunuz.'} 
      formSettings={membershipPage.formSettings || []}
    />
  );
}
