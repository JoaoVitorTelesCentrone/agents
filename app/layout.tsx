import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agents OS',
  description: 'AI operations workspace for teams and agents.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
