import { formatStorageBytes, STORAGE_QUOTA_BYTES } from '@/lib/storage';

export function StorageUsage({ usedBytes }: { usedBytes: number }) {
  const percentage = Math.min(100, (usedBytes / STORAGE_QUOTA_BYTES) * 100);
  const nearLimit = percentage >= 80;
  return <div className="storage-usage" aria-label={`Uso do armazenamento: ${formatStorageBytes(usedBytes)} de 1 GB`}>
    <div className="storage-usage-header"><div><span className="storage-label">ARMAZENAMENTO DA GALERIA</span><strong>{formatStorageBytes(usedBytes)} <small>de 1 GB</small></strong></div><span className={nearLimit ? 'storage-percent warning' : 'storage-percent'}>{percentage.toFixed(1)}%</span></div>
    <div className="storage-meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Number(percentage.toFixed(1))} aria-label="Uso do armazenamento"><span className={nearLimit ? 'warning' : ''} style={{ width: `${percentage}%` }} /></div>
    <p>{nearLimit ? 'O espaço está próximo do limite. Remova arquivos antigos antes de novos uploads.' : 'O limite considera todos os arquivos enviados pelo painel.'}</p>
  </div>;
}
