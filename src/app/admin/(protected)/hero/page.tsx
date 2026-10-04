import Image from 'next/image';
import { saveHeroAction } from '@/app/admin/actions';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { MultiImageUploader } from '@/components/admin/MultiImageUploader';
import { db } from '@/lib/db';

export default async function HeroAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [settings, params] = await Promise.all([db.siteSettings.findUniqueOrThrow({ where: { id: 'default' } }), searchParams]);
  let heroImages: string[] = [];
  try {
    const parsed = JSON.parse(settings.heroImages);
    heroImages = Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string').slice(0, 8) : [];
  } catch {
    heroImages = [];
  }
  if (!heroImages.length) heroImages = [settings.heroImage];
  return <><header className="admin-topbar"><div><h1>Hero / Identidade</h1><p>Gerencie a imagem principal e as informações editáveis.</p></div><a className="primary-button" href="#hero-form">Salvar alterações</a></header><div className="admin-content">{params.saved ? <div className="flash">Alterações salvas com sucesso.</div> : null}<form id="hero-form" action={saveHeroAction}><section className="admin-card"><div className="admin-card-header"><div><h2>Galeria do hero</h2><p>Adicione até 8 fotos. Elas alternam automaticamente na página inicial.</p></div></div><MultiImageUploader name="heroImages" current={heroImages} /><div className="form-grid hero-settings-grid"><div className="field"><label>Troca a cada (segundos)</label><input name="heroIntervalSeconds" type="number" min="2" max="60" defaultValue={settings.heroIntervalSeconds} required /></div><div className="field"><label>Imagem de fallback</label><ImageUploader name="heroImage" current={settings.heroImage} label="Trocar fallback" /></div></div></section><section className="admin-card"><div className="admin-card-header"><div><h2>Identidade fixa LENT</h2><p>O logo, a tipografia e o grid são protegidos pelo sistema.</p></div></div><div className="upload-box"><div className="upload-preview"><Image src="/brand/lent-logo.png" alt="Logo LENT fixo" fill sizes="190px" /></div><div><p className="notice-text">Esta arte é fixa e não pode ser alterada. Ela faz parte da identidade do artista.</p><div className="form-grid"><div className="field"><label>Nome real</label><input name="realName" defaultValue={settings.realName} required /></div><div className="field"><label>Localização</label><input name="location" defaultValue={settings.location} required /></div><div className="field"><label>País</label><input name="country" defaultValue={settings.country} required /></div><div className="field"><label>Tagline</label><input name="tagline" defaultValue={settings.tagline} required /></div></div></div></div><div className="form-actions"><button className="primary-button" type="submit">Salvar alterações</button></div></section></form></div></>;
}
