import type { Metadata } from 'next';
import { Open_Sans, Oswald } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import { AppLayout } from '@/components/AppLayout';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-oswald',
});

export const metadata: Metadata = {
  title: 'GGON FFPO Research Portal',
  description:
    'Members-only research portal for the Global Gas and Oil Network — fossil fuel phase-out research library.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <AppProvider>
          <AppLayout>{children}</AppLayout>
        </AppProvider>
      </body>
    </html>
  );
}
