'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export function ImageUploader({ name, current, label = 'Imagem' }: { name: string; current: string; label?: string }) {
  const [value, setValue] = useState(current);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true); setMessage('Enviando...');
    const data = new FormData(); data.append('file', file);
    const response = await fetch('/api/upload', { method: 'POST', body: data });
    const result = await response.json() as { url?: string; error?: string };
    setLoading(false);
    if (!response.ok || !result.url) { setMessage(result.error ?? 'Falha no upload.'); return; }
    setValue(result.url); setMessage('Upload concluído. Salve as alterações.');
  }

  return <div className="upload-box"><div className="upload-preview"><Image src={value || '/uploads/lent-original.jpg'} alt="Prévia da imagem" fill sizes="190px" /></div><div className="upload-input"><label className="field"><span>{label}</span><input type="hidden" name={name} value={value} /><input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={loading} /></label><small className="upload-message">{message || 'JPG, PNG ou WEBP · máximo 10 MB'}</small></div></div>;
}
