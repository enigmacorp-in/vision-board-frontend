import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { CSPostHogProvider } from './providers';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Enigma AI',
  description: 'Transform your ideas into stunning visuals with AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={montserrat.className}>
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
