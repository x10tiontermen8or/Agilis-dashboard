// 📂 app/layout.tsx
'use client';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { DataProvider } from './context/data-context';
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // We no longer need the 'isCollapsed' state here
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <title>Agilis Dashboard</title>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <DataProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* This is now a simple flexbox layout */}
            <div className="flex min-h-screen w-full">
              <Sidebar />
              <div className="flex flex-col flex-1">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40 overflow-auto">
                  {children}
                </main>
              </div>
            </div>
            <Analytics />
            <Toaster richColors />
          </ThemeProvider>
        </DataProvider>
      </body>
    </html>
  );
}