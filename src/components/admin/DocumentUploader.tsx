'use client';

import { ChangeEvent, useState } from 'react';

type UploadResponse = { mediaId?: string; error?: string };

export function DocumentUploader({ currentName, currentMediaId }: { currentName?: string; currentMediaId?: string }) {
  const [mediaId, setMediaId] = useState(currentMediaId ?? '');
  const [filename, setFilename] = useState(currentName ?? '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setMessage('Enviando PDF...');
    const data = new FormData();
    data.append('file', file);
    data.append('kind', 'pdf');
    const response = await fetch('/api/upload', { method: 'POST', body: data });
    const result = await response.json() as UploadResponse;
    setLoading(false);
    if (!response.ok || !result.mediaId) {
      setMessage(result.error ?? 'Falha no upload do PDF.');
      return;
    }
    setMediaId(result.mediaId);
    setFilename(file.name);
    setMessage('PDF enviado. Salve o material para publicá-lo.');
    event.target.value = '';
  }

  return <div className="document-uploader"><input type="hidden" name="mediaId" value={mediaId} /><div className="document-file"><span className="document-badge">PDF</span><div><strong>{filename || 'Nenhum PDF selecionado'}</strong><small>{filename ? 'Arquivo pronto para publicação' : 'Envie um PDF de até 50 MB'}</small></div></div><input type="file" accept="application/pdf,.pdf" onChange={upload} disabled={loading} /><small className="upload-message">{message || 'Formato permitido: PDF · máximo 50 MB por arquivo'}</small></div>;
}
