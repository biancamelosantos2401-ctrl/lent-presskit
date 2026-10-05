import Image from 'next/image';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { createPhotosAction, deletePhotoAction, movePhotoAction, togglePhotoAction } from '@/app/admin/actions';
import { ConfirmSubmit } from '@/components/admin/ConfirmSubmit';
import { PhotoUploader } from '@/components/admin/PhotoUploader';
import { StorageUsage } from '@/components/admin/StorageUsage';
import { db } from '@/lib/db';

export default async function PhotosAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [items, params, mediaUsage] = await Promise.all([
    db.photo.findMany({ orderBy: { position: 'asc' } }),
    searchParams,
    db.media.aggregate({ _sum: { size: true } }),
  ]);

  return <>
    <header className="admin-topbar">
      <div><h1>Fotos</h1><p>Galeria exibida na página inicial.</p></div>
    </header>
    <div className="admin-content">
      {params.saved ? <div className="flash">Alterações salvas com sucesso.</div> : null}
      <StorageUsage usedBytes={mediaUsage._sum.size ?? 0} />

      <section className="admin-card">
        <div className="admin-card-header"><div><h2>Enviar fotos</h2><p>Selecione uma ou várias imagens de uma vez.</p></div></div>
        <form action={createPhotosAction}>
          <PhotoUploader name="urls" />
        </form>
      </section>

      <section className="admin-card">
        <div className="admin-card-header"><div><h2>Fotos publicadas</h2><p>{items.length} foto{items.length === 1 ? '' : 's'} na galeria.</p></div></div>
        {items.length ? (
          <table className="admin-table">
            <thead><tr><th>Foto</th><th>Status</th><th>Ordem</th><th>Ações</th></tr></thead>
            <tbody>
              {items.map((item, index) => <tr key={item.id}>
                <td><span className="gallery-preview" style={{ position: 'relative', display: 'inline-block', width: 64, height: 44 }}><Image src={item.imageUrl} alt={item.title || 'Foto da galeria'} fill sizes="64px" style={{ objectFit: 'cover', borderRadius: 4 }} /></span></td>
                <td><span className={item.enabled ? 'status-pill' : 'status-pill pending'}>{item.enabled ? 'VISÍVEL' : 'OCULTA'}</span></td>
                <td>
                  <div className="table-actions">
                    <form className="inline-form" action={movePhotoAction}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="direction" value="up" /><button className="secondary-button" type="submit" disabled={index === 0} aria-label="Subir"><ChevronUp size={14} /></button></form>
                    <form className="inline-form" action={movePhotoAction}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="direction" value="down" /><button className="secondary-button" type="submit" disabled={index === items.length - 1} aria-label="Descer"><ChevronDown size={14} /></button></form>
                  </div>
                </td>
                <td>
                  <div className="table-actions">
                    <form className="inline-form" action={togglePhotoAction}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="enabled" value={String(!item.enabled)} /><button className="secondary-button" type="submit">{item.enabled ? 'Ocultar' : 'Exibir'}</button></form>
                    <form className="inline-form" action={deletePhotoAction}><input type="hidden" name="id" value={item.id} /><ConfirmSubmit><Trash2 size={14} /></ConfirmSubmit></form>
                  </div>
                </td>
              </tr>)}
            </tbody>
          </table>
        ) : <div className="empty-state">Nenhuma foto publicada ainda.</div>}
      </section>
    </div>
  </>;
}
