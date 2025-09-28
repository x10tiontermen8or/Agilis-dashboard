// 📂 components/header.tsx
'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, LineChart, Map, Menu, Package, Settings, Siren, HardDrive } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { useData } from '@/app/context/data-context';
import { ReportIncidentForm } from './report-incident-form';
import { LiveClock } from './live-clock';

export function Header() {
  const pathname = usePathname();
  const { feeds, refreshData } = useData();

  const getPageTitle = () => {
    if (pathname === '/') return 'Control Panel';
    if (pathname === '/analytics') return 'Analytics & Reporting';
    if (pathname === '/signal-controls') return 'Signal Controls';
    if (pathname === '/alerts') return 'Alerts';
    if (pathname === '/map') return 'Map View';
    if (pathname === '/settings') return 'Settings';
    return 'Agilis';
  };

  const navLinks = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/analytics', label: 'Analytics', icon: LineChart },
    { href: '/signal-controls', label: 'Signal Controls', icon: HardDrive },
    { href: '/alerts', label: 'Alerts', icon: Siren },
    { href: '/map', label: 'City Map', icon: Map },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium p-4">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Package className="h-6 w-6" />
                  <span>Agilis</span>
                </Link>
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link key={label} href={href} className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                    <Icon className="h-5 w-5" /> {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>
      
      {/* Right side */}
      <div className="flex items-center gap-4">
        <LiveClock />
        <ReportIncidentForm feeds={feeds} onIncidentReported={refreshData} />
        <ThemeToggle />
      </div>
    </header>
  );
}