import { Inter } from 'next/font/google';
import './globals.css';
import { Toast as Toaster } from '../components/ui/toast';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Secondo Tempo',
  description: 'App di gestione ristorante',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
