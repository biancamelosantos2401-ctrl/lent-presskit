import { describe, expect, it } from 'vitest';
import { canStoreFile, formatStorageBytes, STORAGE_QUOTA_BYTES } from '@/lib/storage';
import { contactSchema, socialSchema, siteSettingsSchema } from '@/lib/validation';

describe('validações do EPK LENT', () => {
  it('aceita URL HTTPS para redes sociais', () => {
    expect(socialSchema.safeParse({ id: 'social-1', url: 'https://instagram.com/lent', enabled: true }).success).toBe(true);
  });

  it('recusa protocolo inseguro em redes sociais', () => {
    expect(socialSchema.safeParse({ id: 'social-1', url: 'javascript:alert(1)', enabled: true }).success).toBe(false);
  });

  it('aceita contato interno por ancora', () => {
    expect(contactSchema.safeParse({ bookingUrl: '#contato', whatsappEnabled: false, whatsappPhone: '', whatsappMessage: '', whatsappButtonText: 'Entrar em contato' }).success).toBe(true);
  });

  it('exige identidade e imagem do hero', () => {
    expect(siteSettingsSchema.safeParse({ realName: 'João Quaresma', location: 'Belo Horizonte', country: 'Brasil', tagline: 'MUSIC / PARTY / CULTURE', heroImage: '/uploads/lent-original.jpg', heroImages: ['/uploads/lent-original.jpg'], heroIntervalSeconds: 7 }).success).toBe(true);
    expect(siteSettingsSchema.safeParse({ realName: '', location: 'BH', country: 'Brasil', tagline: 'Music', heroImage: '', heroImages: [], heroIntervalSeconds: 7 }).success).toBe(false);
  });

  it('impede ultrapassar a quota global de 1 GB', () => {
    expect(canStoreFile(STORAGE_QUOTA_BYTES - 10, 10)).toBe(true);
    expect(canStoreFile(STORAGE_QUOTA_BYTES - 10, 11)).toBe(false);
    expect(canStoreFile(0, 0)).toBe(false);
  });

  it('formata o uso do armazenamento para o painel', () => {
    expect(formatStorageBytes(0)).toBe('0 B');
    expect(formatStorageBytes(1024 * 1024)).toBe('1.0 MB');
  });
});
