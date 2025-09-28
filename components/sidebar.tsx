// 📂 components/sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Home, LineChart, Map, Package, Settings, Siren, BarChart, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/analytics', label: 'Analytics', icon: LineChart },
    { href: '#', label: 'Signal Controls', icon: HardDrive },
    { href: '#', label: 'Alerts', icon: Siren },
    { href: '#', label: 'Performance', icon: BarChart },
    { href: '/map', label: 'City Map', icon: Map },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span className="">Agilis</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted hover:text-primary ${
                  pathname === href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/settings"
            className={`flex items-center w-full gap-3 rounded-md px-3 py-2 transition-all hover:bg-muted hover:text-primary text-sm ${
                pathname === '/settings' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}