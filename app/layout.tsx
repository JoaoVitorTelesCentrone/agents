import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agents OS',
  description: 'AI operating system for teams and companies.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
