/**
 * @module Storage
 * @description Storage persistente em Vercel Blob com contrato estável para o acervo de mídia.
 * @layer Infrastructure
 * @depends @vercel/blob, crypto
 * @consumers upload API and media services
 * @maintenance docs/MAINTENANCE.md#uploads
 */
import { del, put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
import { db } from '@/lib/db';

const allowedTypes = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
]);

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_DOCUMENT_BYTES = 50 * 1024 * 1024;
export const STORAGE_QUOTA_BYTES = 1024 * 1024 * 1024;

/**
 * Retorna o uso acumulado dos arquivos registrados no acervo de mídia.
 *
 * @returns Total de bytes persistidos no acervo.
 * @maintenance docs/MAINTENANCE.md#uploads
 */
export async function getStorageUsage() {
  const result = await db.media.aggregate({ _sum: { size: true } });
  return result._sum.size ?? 0;
}

/**
 * Verifica se um novo arquivo cabe no limite global do acervo.
 *
 * @param usedBytes - Uso atual em bytes.
 * @param fileSize - Tamanho do novo arquivo em bytes.
 * @returns Se o arquivo pode ser recebido sem ultrapassar 1 GB.
 * @maintenance docs/MAINTENANCE.md#uploads
 */
export function canStoreFile(usedBytes: number, fileSize: number) {
  return usedBytes >= 0 && fileSize > 0 && usedBytes + fileSize <= STORAGE_QUOTA_BYTES;
}

/**
 * Converte bytes para uma unidade legível no painel administrativo.
 *
 * @param bytes - Quantidade de bytes.
 * @returns Texto formatado em B, KB, MB ou GB.
 * @maintenance docs/MAINTENANCE.md#uploads
 */
export function formatStorageBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes;
  let unit = units[0];
  for (let index = 0; index < units.length && value >= 1024; index += 1) {
    value /= 1024;
    unit = units[index] ?? 'GB';
  }
  return `${value.toFixed(value >= 10 || unit === 'GB' ? 0 : 1)} ${unit}`;
}

/**
 * Remove um arquivo salvo quando o registro de mídia não pôde ser concluído.
 *
 * Arquivos legados servidos de `/uploads` continuam no bundle público e não têm
 * o que remover no Blob, por isso a ausência de URL absoluta é ignorada.
 *
 * @param filename - Nome do arquivo ou URL absoluta retornada pelo Blob.
 * @returns Promise resolvida após a tentativa de remoção.
 * @maintenance docs/MAINTENANCE.md#uploads
 */
export async function removeStoredImage(filename: string) {
  if (!filename.startsWith('http')) return;
  await del(filename).catch(() => undefined);
}

/**
 * Valida e grava uma imagem no Blob público.
 *
 * @param file - Imagem recebida pelo formulário multipart.
 * @returns Metadados do arquivo gravado, com URL absoluta do Blob.
 * @throws Error quando o MIME ou o tamanho são inválidos.
 * @maintenance docs/MAINTENANCE.md#uploads
 */
export async function storeImage(file: File) {
  const extension = allowedTypes.get(file.type);
  if (!extension) throw new Error('Formato inválido. Use JPG, PNG ou WEBP.');
  if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) throw new Error('A imagem deve ter até 10 MB.');

  const filename = `${randomUUID()}${extension}`;
  const blob = await put(`uploads/${filename}`, file, { access: 'public', contentType: file.type });

  return { filename: blob.url, url: blob.url, mimeType: file.type, size: file.size };
}

/**
 * Valida e grava um PDF no Blob público.
 *
 * @param file - PDF recebido pelo formulário multipart.
 * @returns Metadados do arquivo gravado, com URL absoluta do Blob.
 * @throws Error quando o MIME ou o tamanho individual são inválidos.
 * @maintenance docs/MAINTENANCE.md#uploads
 */
export async function storeDocument(file: File) {
  if (file.type !== 'application/pdf') throw new Error('Formato inválido. Envie apenas PDF.');
  if (file.size <= 0 || file.size > MAX_DOCUMENT_BYTES) throw new Error('O PDF deve ter até 50 MB.');

  const filename = `${randomUUID()}.pdf`;
  const blob = await put(`uploads/${filename}`, file, { access: 'public', contentType: file.type });

  return { filename: blob.url, url: blob.url, mimeType: file.type, size: file.size };
}
