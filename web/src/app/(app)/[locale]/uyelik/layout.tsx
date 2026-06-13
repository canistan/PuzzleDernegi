import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Üyelik Formu | Puzzle Derneği',
};

export default function UyelikLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
