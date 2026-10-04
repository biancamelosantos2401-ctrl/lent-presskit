import { Instagram, Music2, Youtube, Cloud, Disc3 } from 'lucide-react';
import { saveSocialAction } from '@/app/admin/actions';
import { db } from '@/lib/db';

const icons = { Instagram, SoundCloud: Cloud, Spotify: Disc3, YouTube: Youtube, TikTok: Music2 };

export default async function SocialAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [links, params] = await Promise.all([db.socialLink.findMany({ orderBy: { position: 'asc' } }), searchParams]);
  return <><header className="admin-topbar"><div><h1>Redes sociais</h1><p>Configure as plataformas exibidas abaixo da identidade.</p></div></header><div className="admin-content">{params.saved ? <div className="flash">Alteracoes salvas com sucesso.</div> : null}<section className="admin-card"><div className="admin-card-header"><div><h2>Redes sociais e plataformas</h2><p>URLs sao validadas no servidor e abertas com seguranca.</p></div></div>{links.map((link) => { const Icon = icons[link.platform as keyof typeof icons] ?? Music2; return <form className="admin-table-row" action={saveSocialAction} key={link.id}><input type="hidden" name="id" value={link.id} /><div className="social-admin-row"><span className="social-admin-name"><Icon size={18} />{link.platform}</span><input name="url" defaultValue={link.url} placeholder="https://..." /><span className="status-pill">{link.enabled ? 'ATIVO' : 'OCULTO'}</span><label className="toggle-line"><input type="checkbox" name="enabled" defaultChecked={link.enabled} /> Exibir</label><button className="primary-button" type="submit">Salvar</button></div></form>; })}</section></div></>;
}
