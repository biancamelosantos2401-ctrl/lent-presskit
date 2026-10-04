/**
 * @module SiteData
 * @description Consultas públicas do conteúdo editável do EPK.
 * @layer Application
 * @depends Prisma repositories
 * @consumers public pages
 * @maintenance docs/MAINTENANCE.md#site-publico
 */
import { db } from '@/lib/db';

export async function getPublicSiteData() {
  const [settings, sections, socials, agenda, events, sets, about, stats, resources] = await Promise.all([
    db.siteSettings.findUniqueOrThrow({ where: { id: 'default' } }),
    db.sectionSettings.findMany({ orderBy: { section: 'asc' } }),
    db.socialLink.findMany({ where: { enabled: true }, orderBy: { position: 'asc' } }),
    db.agendaItem.findMany({ where: { enabled: true, eventDate: { gte: new Date() } }, orderBy: [{ eventDate: 'asc' }, { position: 'asc' }], take: 3 }),
    db.recentEvent.findMany({ where: { enabled: true }, include: { images: { orderBy: { position: 'asc' } } }, orderBy: { position: 'asc' }, take: 1 }),
    db.setItem.findMany({ where: { enabled: true }, orderBy: { position: 'asc' }, take: 3 }),
    db.aboutSection.findUniqueOrThrow({ where: { id: 'default' } }),
    db.aboutStat.findMany({ where: { enabled: true }, orderBy: { position: 'asc' } }),
    db.resource.findMany({ where: { enabled: true }, include: { media: true }, orderBy: { position: 'asc' } }),
  ]);

  let heroImages: string[] = [];
  try {
    const parsed = JSON.parse(settings.heroImages);
    heroImages = Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string' && value.length > 0).slice(0, 8) : [];
  } catch {
    heroImages = [];
  }
  return { settings: { ...settings, heroImages: heroImages.length ? heroImages : [settings.heroImage] }, sections, socials, agenda, events, sets, about, stats, resources };
}
