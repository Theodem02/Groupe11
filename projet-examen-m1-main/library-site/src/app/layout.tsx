import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import NavigationMenu from './NavigationMenu';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationMenu/>
        {children}</body>
    </html>
  );
}
