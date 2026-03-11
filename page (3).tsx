import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'RACE-SHED-FANTASY',
  description: 'NASCAR fantasy league dashboard built for Excel + Git + Vercel workflows.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Header />
          <main className="page-shell">{children}</main>
        </div>
      </body>
    </html>
  );
}
