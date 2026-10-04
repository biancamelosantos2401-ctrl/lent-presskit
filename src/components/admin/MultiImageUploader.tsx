'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

type UploadResponse = { url?: string; error?: string };

export function MultiImageUploader({ name, current }: { name: string; current: string[] }) {
  const [values, setValues] = useState(current);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const availableSlots = Math.max(0, 8 - values.length);
    const files = selectedFiles.slice(0, availableSlots);
    if (!files.length) {
      setMessage('A galeria já possui o limite de 8 imagens.');
      return;
    }

    setLoading(true);
    setMessage(files.length < selectedFiles.length ? 'A galeria aceita no máximo 8 imagens. Enviando as vagas disponíveis...' : 'Enviando imagens...');
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
      setValues((previous) => [...previous, result.url as string].slice(0, 8));
    }
    setMessage(`${uploaded} upload${uploaded === 1 ? '' : 's'} concluído${uploaded === 1 ? '' : 's'}. Salve o evento.`);
    setLoading(false);
    event.target.value = '';
  }

  function remove(index: number) {
    setValues((previous) => previous.filter((_, currentIndex) => currentIndex !== index));
  }

  return <div className="gallery-uploader"><input type="hidden" name={name} value={JSON.stringify(values)} /><div className="gallery-previews">{values.map((value, index) => <div className="gallery-preview" key={`${value}-${index}`}><Image src={value} alt="Prévia da galeria" fill sizes="120px" /><button type="button" onClick={() => remove(index)} aria-label="Remover imagem">×</button></div>)}</div><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} disabled={loading || values.length >= 8} /><small className="upload-message">{message || 'Até 8 imagens · JPG, PNG ou WEBP · máximo 10 MB por arquivo'}</small></div>;
}
