import { createResourceAction, updateResourceAction } from '@/app/admin/actions';
import { DocumentUploader } from '@/components/admin/DocumentUploader';

type ResourceItem = { id: string; title: string; description: string; enabled: boolean; media: { id: string; originalName: string } };

export function ResourceForm({ item }: { item?: ResourceItem }) {
  const action = item ? updateResourceAction : createResourceAction;
  return <form action={action} className="admin-card"><div className="admin-card-header"><div><h2>{item ? 'Editar material' : 'Novo material'}</h2><p>Publique um PDF para download no site.</p></div></div>{item ? <input type="hidden" name="id" value={item.id} /> : null}<div className="form-grid"><div className="field"><label>Título</label><input name="title" defaultValue={item?.title} placeholder="Press kit 2026" required /></div><label className="toggle-line"><input type="checkbox" name="enabled" defaultChecked={item?.enabled ?? true} /> Exibir no site</label><div className="field full"><label>Descrição</label><textarea name="description" defaultValue={item?.description} placeholder="Apresentação, rider ou material oficial." /></div></div><div className="admin-section"><label className="field"><span>Arquivo PDF</span><DocumentUploader currentName={item?.media.originalName} currentMediaId={item?.media.id} /></label></div><div className="form-actions"><button className="primary-button" type="submit">Salvar material</button></div></form>;
}
