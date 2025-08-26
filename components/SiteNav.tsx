"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/businesses", label: "Businesses" },
  { href: "/products", label: "Products" },
  { href: "/groups", label: "Groups" },
  { href: "/chat", label: "Chat" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        <span className="text-lg font-semibold">Grouffy</span>
        <ul className="flex items-center gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  "rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100",
                  pathname === l.href && "bg-gray-900 text-white hover:bg-gray-900"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
