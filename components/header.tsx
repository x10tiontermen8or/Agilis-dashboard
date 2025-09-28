// 📂 components/header.tsx

'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, LineChart, Map, Menu, Package } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { useData } from '@/app/context/data-context';
import { ReportIncidentForm } from './report-incident-form';
import { LiveClock } from './live-clock';

export function Header() {
  const pathname = usePathname();
  const { feeds, refreshFeeds } = useData();

  const getPageTitle = () => {
    if (pathname === '/') return 'Control Panel';
    if (pathname === '/map') return 'Map View';
    if (pathname === '/analytics') return 'Analytics & Reporting';
    if (pathname === '/settings') return 'Settings';
    return 'Agilis';
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Package className="h-6 w-6" />
              <span>Agilis</span>
            </Link>
            <Link href="/" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" /> Control Panel
            </Link>
            <Link href="/map" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <Map className="h-5 w-5" /> Map View
            </Link>
            <Link href="/analytics" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <LineChart className="h-5 w-5" /> Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>

      <LiveClock />

      <div className="flex items-center gap-2 ml-auto">
        <ReportIncidentForm feeds={feeds} onIncidentReported={refreshFeeds} />
        <ThemeToggle />
      </div>
    </header>
  );
}