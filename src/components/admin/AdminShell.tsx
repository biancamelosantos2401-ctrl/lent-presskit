'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, ExternalLink, FileText, Home, Image as ImageIcon, Info, Link2, ListMusic, LogOut, MessageCircle } from 'lucide-react';

const nav = [
  { href: '/admin', label: 'Painel', icon: Home },
  { href: '/admin/hero', label: 'Hero', icon: ImageIcon },
  { href: '/admin/agenda', label: 'Agenda', icon: CalendarDays },
  { href: '/admin/eventos', label: 'Últimos eventos', icon: ImageIcon },
  { href: '/admin/materiais', label: 'Arquivos e materiais', icon: FileText },
  { href: '/admin/sets', label: 'SETs', icon: ListMusic },
  { href: '/admin/sobre', label: 'Sobre', icon: Info },
  { href: '/admin/redes-sociais', label: 'Redes sociais', icon: Link2 },
  { href: '/admin/contato', label: 'Contato', icon: MessageCircle },
];

export function AdminShell({ children, email }: { children: React.ReactNode; email?: string | null }) {
  const pathname = usePathname();
  return <div className="admin-shell"><div className="admin-layout"><aside className="admin-sidebar"><div className="admin-brand"><Image src="/brand/lent-logo.png" alt="LENT" width={120} height={75} /><small>Painel<br />do Artista</small></div><nav className="admin-nav" aria-label="Administração">{nav.map(({ href, label, icon: Icon }) => <Link className={pathname === href ? 'active' : ''} href={href} key={href}><Icon size={17} />{label}</Link>)}</nav><div className="admin-sidebar-footer"><Link href="/" target="_blank"><ExternalLink size={16} />Ver site</Link><span className="notice-text">{email}</span><button className="admin-logout" onClick={() => signOut({ callbackUrl: '/admin/login' })}><LogOut size={16} />Sair</button></div></aside><main className="admin-main">{children}</main></div></div>;
}
