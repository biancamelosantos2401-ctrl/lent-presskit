/**
 * @module Validation
 * @description Schemas Zod compartilhados entre Server Actions e APIs.
 * @layer Domain
 * @depends zod
 * @consumers admin forms and upload API
 * @maintenance docs/MAINTENANCE.md#validacao
 */
import { z } from 'zod';

const safeUrl = z.string().trim().url().refine((value) => ['http:', 'https:'].includes(new URL(value).protocol), 'Use uma URL HTTP ou HTTPS.');

export const siteSettingsSchema = z.object({
  realName: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(80),
  country: z.string().trim().min(2).max(80),
  tagline: z.string().trim().min(2).max(120),
  heroImage: z.string().trim().min(1).max(500),
  heroImages: z.array(z.string().trim().min(1).max(500)).max(8),
  heroIntervalSeconds: z.coerce.number().int().min(2).max(60),
});

export const resourceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().max(300),
  mediaId: z.string().trim().min(1).max(100),
  enabled: z.boolean(),
});

export const contactSchema = z.object({
  bookingUrl: z.string().trim().max(500).refine((value) => !value || value.startsWith('#') || safeUrl.safeParse(value).success, 'URL de booking inválida.'),
  whatsappEnabled: z.boolean(),
  whatsappPhone: z.string().trim().max(30),
  whatsappMessage: z.string().trim().max(300),
  whatsappButtonText: z.string().trim().min(2).max(60),
});

export const socialSchema = z.object({
  id: z.string().min(1),
  url: z.string().trim().max(500).refine((value) => !value || safeUrl.safeParse(value).success, 'URL social inválida.'),
  enabled: z.boolean(),
});

export const agendaSchema = z.object({
  eventDate: z.coerce.date(),
  title: z.string().trim().min(2).max(120),
  venue: z.string().trim().min(2).max(120),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(30),
  country: z.string().trim().min(2).max(80),
  status: z.enum(['CONFIRMADO', 'A CONFIRMAR', 'CANCELADO']),
  ticketUrl: z.string().trim().max(500).refine((value) => !value || safeUrl.safeParse(value).success, 'URL de ingresso inválida.'),
  enabled: z.boolean(),
});

export const eventSchema = z.object({
  title: z.string().trim().min(2).max(120),
  subtitle: z.string().trim().min(2).max(120),
  description: z.string().trim().max(1000),
  eventDate: z.coerce.date(),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(30),
  coverImage: z.string().trim().min(1).max(500),
  galleryImages: z.array(z.string().trim().min(1).max(500)).max(8),
  enabled: z.boolean(),
});

export const setSchema = z.object({
  title: z.string().trim().min(2).max(120),
  subtitle: z.string().trim().min(2).max(120),
  genre: z.string().trim().min(2).max(80),
  duration: z.string().trim().min(2).max(30),
  platform: z.enum(['SoundCloud', 'Mixcloud', 'YouTube', 'Spotify', 'Link externo']),
  coverImage: z.string().trim().min(1).max(500),
  embedUrl: z.string().trim().max(500).refine((value) => !value || safeUrl.safeParse(value).success, 'Embed URL inválida.'),
  externalUrl: z.string().trim().max(500).refine((value) => !value || safeUrl.safeParse(value).success, 'URL externa inválida.'),
  enabled: z.boolean(),
});

export const aboutSchema = z.object({
  title: z.string().trim().min(2).max(80),
  body: z.string().trim().min(20).max(2000),
  imageUrl: z.string().trim().min(1).max(500),
  enabled: z.boolean(),
});

export const statSchema = z.object({
  value: z.string().trim().min(1).max(20),
  label: z.string().trim().min(1).max(40),
  enabled: z.boolean(),
});
