import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ResourceForm } from '@/components/admin/ResourceForm';
import { db } from '@/lib/db';

export default async function EditMaterialPage({ params }: { params: Promise<{ id: string }> }) {
  const item = await db.resource.findUnique({ where: { id: (await params).id }, include: { media: true } });
  if (!item) notFound();
  return <><header className="admin-topbar"><div><h1>Editar material</h1><p>Atualize o PDF e as informações exibidas.</p></div><Link className="secondary-button" href="/admin/materiais">Voltar</Link></header><div className="admin-content"><ResourceForm item={item} /></div></>;
}
