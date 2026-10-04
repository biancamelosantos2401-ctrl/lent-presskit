import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LENT | DJ & Producer',
  description: 'LENT — João Quaresma. Music, party and culture.',
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'LENT | DJ & Producer',
    description: 'Music / Party / Culture',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
