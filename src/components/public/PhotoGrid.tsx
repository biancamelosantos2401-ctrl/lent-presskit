import Image from 'next/image';

type Photo = { id: string; imageUrl: string; title: string };

/**
 * Grade de miniaturas da galeria pública, exibida na home.
 */
export function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (!photos.length) return <div className="empty-state">Fotos em breve.</div>;
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <figure className="photo-thumb" key={photo.id}>
          <Image src={photo.imageUrl} alt={photo.title || 'Foto de LENT'} fill sizes="(max-width: 820px) 33vw, 20vw" />
        </figure>
      ))}
    </div>
  );
}
