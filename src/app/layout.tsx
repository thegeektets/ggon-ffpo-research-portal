import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'GGON FFPO Research Portal',
  description:
    'Members-only research portal for the Global Gas and Oil Network — fossil fuel phase-out research library.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-stone-50 text-gray-900 antialiased">
        <AppProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
