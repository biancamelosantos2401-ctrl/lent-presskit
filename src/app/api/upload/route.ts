import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { canStoreFile, getStorageUsage, removeStoredImage, STORAGE_QUOTA_BYTES, storeDocument, storeImage } from '@/lib/storage';

/**
 * Recebe uma imagem autenticada e registra seu uso no acervo persistente.
 * @maintenance docs/MAINTENANCE.md#uploads
 */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'Arquivo não enviado.' }, { status: 400 });
    const kind = String(formData.get('kind') ?? 'image');
    if (kind !== 'image' && kind !== 'pdf') return NextResponse.json({ error: 'Tipo de upload inválido.' }, { status: 400 });

    const usedBytes = await getStorageUsage();
    if (!canStoreFile(usedBytes, file.size)) {
      return NextResponse.json({ error: `Limite de 1 GB atingido. Uso atual: ${usedBytes} bytes.`, usedBytes, quotaBytes: STORAGE_QUOTA_BYTES }, { status: 413 });
    }

    const stored = kind === 'pdf' ? await storeDocument(file) : await storeImage(file);
    try {
      const media = await db.media.create({ data: { filename: stored.filename, originalName: file.name, mimeType: stored.mimeType, size: stored.size, url: stored.url } });
      return NextResponse.json({ mediaId: media.id, url: stored.url, usedBytes: usedBytes + stored.size, quotaBytes: STORAGE_QUOTA_BYTES });
    } catch (error) {
      await removeStoredImage(stored.filename);
      throw error;
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Falha ao salvar imagem.' }, { status: 400 });
  }
}
