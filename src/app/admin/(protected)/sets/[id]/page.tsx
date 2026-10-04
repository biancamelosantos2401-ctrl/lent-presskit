import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SetForm } from '@/components/admin/SetForm';
import { db } from '@/lib/db';
export default async function EditSetPage({ params }: { params: Promise<{ id: string }> }) { const item = await db.setItem.findUnique({ where: { id: (await params).id } }); if (!item) notFound(); return <><header className="admin-topbar"><div><h1>Editar set</h1><p>Atualize os dados do lançamento.</p></div><Link className="secondary-button" href="/admin/sets">Voltar</Link></header><div className="admin-content"><SetForm item={item} /></div></>; }
