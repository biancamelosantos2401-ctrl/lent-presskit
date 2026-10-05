'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

type UploadResponse = { url?: string; error?: string };

/**
 * Recebe várias fotos de uma vez e acumula as URLs para o formulário da galeria.
 *
 * Diferente de MultiImageUploader, não tem teto de 8 imagens: a galeria de fotos
 * cresce livremente dentro da cota global de 1 GB do acervo.
 */
export function PhotoUploader({ name }: { name: string }) {
  const [values, setValues] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setLoading(true);
    setMessage(`Enviando ${files.length} foto${files.length === 1 ? '' : 's'}...`);
    let uploaded = 0;
    for (const file of files) {
      const data = new FormData();
      data.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await response.json() as UploadResponse;
      if (!response.ok || !result.url) {
        setMessage(result.error ?? 'Falha no upload.');
        setLoading(false);
        event.target.value = '';
        return;
      }
      uploaded += 1;
      setValues((previous) => [...previous, result.url as string]);
    }
    setMessage(`${uploaded} foto${uploaded === 1 ? '' : 's'} enviada${uploaded === 1 ? '' : 's'}. Clique em "Publicar fotos" para salvar.`);
    setLoading(false);
    event.target.value = '';
  }

  function remove(index: number) {
    setValues((previous) => previous.filter((_, currentIndex) => currentIndex !== index));
  }

  return (
    <div className="gallery-uploader">
      <input type="hidden" name={name} value={JSON.stringify(values)} />
      <div className="gallery-previews">
        {values.map((value, index) => (
          <div className="gallery-preview" key={`${value}-${index}`}>
            <Image src={value} alt="Prévia da foto" fill sizes="120px" />
            <button type="button" onClick={() => remove(index)} aria-label="Remover foto">×</button>
          </div>
        ))}
      </div>
      <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} disabled={loading} />
      <small className="upload-message">{message || 'JPG, PNG ou WEBP · máximo 10 MB por arquivo'}</small>
      <button className="primary-button" type="submit" disabled={loading || !values.length}>Publicar fotos</button>
    </div>
  );
}
