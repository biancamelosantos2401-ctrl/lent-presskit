'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { aboutSchema, agendaSchema, contactSchema, eventSchema, resourceSchema, setSchema, siteSettingsSchema, socialSchema, statSchema } from '@/lib/validation';
import { removeStoredImage } from '@/lib/storage';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Sessão administrativa necessária.');
  return session;
}

function text(formData: FormData, key: string) { return String(formData.get(key) ?? '').trim(); }
function checked(formData: FormData, key: string) { return formData.get(key) === 'on' || formData.get(key) === 'true'; }
function redirectSaved(path: string) { revalidatePath('/'); revalidatePath(path); redirect(`${path}?saved=1`); }

export async function saveHeroAction(formData: FormData) {
  await requireAdmin();
  const heroImage = text(formData, 'heroImage');
  const heroImages = parseStringArray(formData, 'heroImages').slice(0, 8);
  const parsed = siteSettingsSchema.safeParse({ realName: text(formData, 'realName'), location: text(formData, 'location'), country: text(formData, 'country'), tagline: text(formData, 'tagline'), heroImage, heroImages: heroImages.length ? heroImages : [heroImage], heroIntervalSeconds: text(formData, 'heroIntervalSeconds') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  await db.siteSettings.update({ where: { id: 'default' }, data: { ...parsed.data, heroImages: JSON.stringify(parsed.data.heroImages) } });
  redirectSaved('/admin/hero');
}

export async function saveContactAction(formData: FormData) {
  await requireAdmin();
  const parsed = contactSchema.safeParse({ bookingUrl: text(formData, 'bookingUrl'), whatsappEnabled: checked(formData, 'whatsappEnabled'), whatsappPhone: text(formData, 'whatsappPhone'), whatsappMessage: text(formData, 'whatsappMessage'), whatsappButtonText: text(formData, 'whatsappButtonText') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  await db.siteSettings.update({ where: { id: 'default' }, data: parsed.data });
  redirectSaved('/admin/contato');
}

export async function saveSocialAction(formData: FormData) {
  await requireAdmin();
  const parsed = socialSchema.safeParse({ id: text(formData, 'id'), url: text(formData, 'url'), enabled: checked(formData, 'enabled') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  await db.socialLink.update({ where: { id: parsed.data.id }, data: { url: parsed.data.url, enabled: parsed.data.enabled } });
  redirectSaved('/admin/redes-sociais');
}

export async function saveSectionAction(formData: FormData) {
  await requireAdmin();
  const section = text(formData, 'section');
  await db.sectionSettings.update({ where: { section }, data: { title: text(formData, 'title'), subtitle: text(formData, 'subtitle'), cta: text(formData, 'cta'), enabled: checked(formData, 'enabled') } });
  redirectSaved(`/admin/${section === 'events' ? 'eventos' : section}`);
}

export async function createAgendaAction(formData: FormData) {
  await requireAdmin();
  const parsed = agendaSchema.safeParse({ eventDate: text(formData, 'eventDate'), title: text(formData, 'title'), venue: text(formData, 'venue'), city: text(formData, 'city'), state: text(formData, 'state'), country: text(formData, 'country'), status: text(formData, 'status'), ticketUrl: text(formData, 'ticketUrl'), enabled: checked(formData, 'enabled') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  const position = await db.agendaItem.count();
  await db.agendaItem.create({ data: { ...parsed.data, position } });
  redirectSaved('/admin/agenda');
}

export async function updateAgendaAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const parsed = agendaSchema.safeParse({ eventDate: text(formData, 'eventDate'), title: text(formData, 'title'), venue: text(formData, 'venue'), city: text(formData, 'city'), state: text(formData, 'state'), country: text(formData, 'country'), status: text(formData, 'status'), ticketUrl: text(formData, 'ticketUrl'), enabled: checked(formData, 'enabled') });
  if (!parsed.success || !id) throw new Error(parsed.success ? 'ID inválido.' : parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  await db.agendaItem.update({ where: { id }, data: parsed.data });
  redirectSaved('/admin/agenda');
}

export async function deleteAgendaAction(formData: FormData) { await requireAdmin(); await db.agendaItem.delete({ where: { id: text(formData, 'id') } }); redirectSaved('/admin/agenda'); }
export async function toggleAgendaAction(formData: FormData) { await requireAdmin(); await db.agendaItem.update({ where: { id: text(formData, 'id') }, data: { enabled: checked(formData, 'enabled') } }); redirectSaved('/admin/agenda'); }

export async function createEventAction(formData: FormData) {
  await requireAdmin();
  const parsed = eventSchema.safeParse({ title: text(formData, 'title'), subtitle: text(formData, 'subtitle'), description: text(formData, 'description'), eventDate: text(formData, 'eventDate'), city: text(formData, 'city'), state: text(formData, 'state'), coverImage: text(formData, 'coverImage'), galleryImages: parseGallery(formData), enabled: checked(formData, 'enabled') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  const { galleryImages, ...eventData } = parsed.data;
  await db.recentEvent.create({ data: { ...eventData, position: await db.recentEvent.count(), images: { create: galleryImages.map((imageUrl, position) => ({ imageUrl, position })) } } });
  redirectSaved('/admin/eventos');
}

export async function updateEventAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const parsed = eventSchema.safeParse({ title: text(formData, 'title'), subtitle: text(formData, 'subtitle'), description: text(formData, 'description'), eventDate: text(formData, 'eventDate'), city: text(formData, 'city'), state: text(formData, 'state'), coverImage: text(formData, 'coverImage'), galleryImages: parseGallery(formData), enabled: checked(formData, 'enabled') });
  if (!parsed.success || !id) throw new Error(parsed.success ? 'ID inválido.' : parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  const { galleryImages, ...eventData } = parsed.data;
  await db.$transaction([db.recentEvent.update({ where: { id }, data: eventData }), db.recentEventImage.deleteMany({ where: { eventId: id } }), db.recentEventImage.createMany({ data: galleryImages.map((imageUrl, position) => ({ eventId: id, imageUrl, position })) })]);
  redirectSaved('/admin/eventos');
}

export async function deleteEventAction(formData: FormData) { await requireAdmin(); await db.recentEvent.delete({ where: { id: text(formData, 'id') } }); redirectSaved('/admin/eventos'); }
export async function toggleEventAction(formData: FormData) { await requireAdmin(); await db.recentEvent.update({ where: { id: text(formData, 'id') }, data: { enabled: checked(formData, 'enabled') } }); redirectSaved('/admin/eventos'); }

export async function createSetAction(formData: FormData) {
  await requireAdmin();
  const parsed = setSchema.safeParse({ title: text(formData, 'title'), subtitle: text(formData, 'subtitle'), genre: text(formData, 'genre'), duration: text(formData, 'duration'), platform: text(formData, 'platform'), coverImage: text(formData, 'coverImage'), embedUrl: text(formData, 'embedUrl'), externalUrl: text(formData, 'externalUrl'), enabled: checked(formData, 'enabled') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  await db.setItem.create({ data: { ...parsed.data, position: await db.setItem.count() } });
  redirectSaved('/admin/sets');
}

export async function updateSetAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const parsed = setSchema.safeParse({ title: text(formData, 'title'), subtitle: text(formData, 'subtitle'), genre: text(formData, 'genre'), duration: text(formData, 'duration'), platform: text(formData, 'platform'), coverImage: text(formData, 'coverImage'), embedUrl: text(formData, 'embedUrl'), externalUrl: text(formData, 'externalUrl'), enabled: checked(formData, 'enabled') });
  if (!parsed.success || !id) throw new Error(parsed.success ? 'ID inválido.' : parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  await db.setItem.update({ where: { id }, data: parsed.data });
  redirectSaved('/admin/sets');
}

export async function deleteSetAction(formData: FormData) { await requireAdmin(); await db.setItem.delete({ where: { id: text(formData, 'id') } }); redirectSaved('/admin/sets'); }
export async function toggleSetAction(formData: FormData) { await requireAdmin(); await db.setItem.update({ where: { id: text(formData, 'id') }, data: { enabled: checked(formData, 'enabled') } }); redirectSaved('/admin/sets'); }

export async function saveAboutAction(formData: FormData) {
  await requireAdmin();
  const parsed = aboutSchema.safeParse({ title: text(formData, 'title'), body: text(formData, 'body'), imageUrl: text(formData, 'imageUrl'), enabled: checked(formData, 'enabled') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  await db.aboutSection.update({ where: { id: 'default' }, data: parsed.data });
  redirectSaved('/admin/sobre');
}

export async function createStatAction(formData: FormData) {
  await requireAdmin();
  const parsed = statSchema.safeParse({ value: text(formData, 'value'), label: text(formData, 'label'), enabled: checked(formData, 'enabled') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  await db.aboutStat.create({ data: { ...parsed.data, position: await db.aboutStat.count() } });
  redirectSaved('/admin/sobre');
}

export async function updateStatAction(formData: FormData) { await requireAdmin(); const id = text(formData, 'id'); const parsed = statSchema.safeParse({ value: text(formData, 'value'), label: text(formData, 'label'), enabled: checked(formData, 'enabled') }); if (!parsed.success || !id) throw new Error('Dados inválidos.'); await db.aboutStat.update({ where: { id }, data: parsed.data }); redirectSaved('/admin/sobre'); }
export async function deleteStatAction(formData: FormData) { await requireAdmin(); await db.aboutStat.delete({ where: { id: text(formData, 'id') } }); redirectSaved('/admin/sobre'); }

export async function createResourceAction(formData: FormData) {
  await requireAdmin();
  const parsed = resourceSchema.safeParse({ title: text(formData, 'title'), description: text(formData, 'description'), mediaId: text(formData, 'mediaId'), enabled: checked(formData, 'enabled') });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  const media = await db.media.findUnique({ where: { id: parsed.data.mediaId } });
  if (!media || media.mimeType !== 'application/pdf') throw new Error('Envie um PDF válido antes de salvar.');
  await db.resource.create({ data: { ...parsed.data, position: await db.resource.count() } });
  redirectSaved('/admin/materiais');
}

export async function updateResourceAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const parsed = resourceSchema.safeParse({ title: text(formData, 'title'), description: text(formData, 'description'), mediaId: text(formData, 'mediaId'), enabled: checked(formData, 'enabled') });
  if (!parsed.success || !id) throw new Error(parsed.success ? 'ID inválido.' : parsed.error.issues[0]?.message ?? 'Dados inválidos.');
  const existing = await db.resource.findUnique({ where: { id }, include: { media: true } });
  const media = await db.media.findUnique({ where: { id: parsed.data.mediaId } });
  if (!existing || !media || media.mimeType !== 'application/pdf') throw new Error('PDF inválido.');
  await db.resource.update({ where: { id }, data: parsed.data });
  if (existing.mediaId !== media.id) {
    await db.media.delete({ where: { id: existing.mediaId } });
    await removeStoredImage(existing.media.filename);
  }
  redirectSaved('/admin/materiais');
}

export async function deleteResourceAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, 'id');
  const existing = await db.resource.findUnique({ where: { id }, include: { media: true } });
  if (!existing) throw new Error('Material não encontrado.');
  await db.resource.delete({ where: { id } });
  await db.media.delete({ where: { id: existing.mediaId } });
  await removeStoredImage(existing.media.filename);
  redirectSaved('/admin/materiais');
}

export async function toggleResourceAction(formData: FormData) {
  await requireAdmin();
  await db.resource.update({ where: { id: text(formData, 'id') }, data: { enabled: checked(formData, 'enabled') } });
  redirectSaved('/admin/materiais');
}

function parseStringArray(formData: FormData, key: string) {
  try {
    const raw = text(formData, key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
  } catch {
    return [];
  }
}

function parseGallery(formData: FormData) { return parseStringArray(formData, 'galleryImages'); }
