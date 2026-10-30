import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/library", label: "Library" },
  { href: "/tools", label: "Tools" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="shrink-0 font-semibold tracking-tight text-slate-100">
          Ahmad Bilal Irfan
        </Link>
        <nav aria-label="Main navigation" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 text-sm sm:pb-0">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full px-3 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ahmad Bilal Irfan</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/library" className="transition hover:text-cyan-200">Engineering library</Link>
          <Link href="/tools" className="transition hover:text-cyan-200">FPGA tools</Link>
          <Link href="/contact" className="inline-flex items-center gap-1 transition hover:text-cyan-200">
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
