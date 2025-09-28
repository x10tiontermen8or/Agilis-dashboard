// 📂 components/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LineChart, Map, Siren, BarChart, HardDrive, Package, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/analytics', label: 'Analytics', icon: LineChart },
    { href: '/signal-controls', label: 'Signal Controls', icon: HardDrive },
    { href: '/alerts', label: 'Alerts', icon: Siren },
    { href: '/map', label: 'City Map', icon: Map },
  ];

  return (
    <aside className="hidden w-16 flex-col border-r bg-background sm:flex">
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="/" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8">
            <Package className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Agilis</span>
          </Link>
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathname === href && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/settings"
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                             pathname === "/settings" && "bg-accent text-accent-foreground"
                        )}
                    >
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}