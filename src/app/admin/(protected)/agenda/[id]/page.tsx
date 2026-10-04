import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AgendaForm } from '@/components/admin/AgendaForm';
import { db } from '@/lib/db';
export default async function EditAgendaPage({ params }: { params: Promise<{ id: string }> }) { const item = await db.agendaItem.findUnique({ where: { id: (await params).id } }); if (!item) notFound(); return <><header className="admin-topbar"><div><h1>Editar agenda</h1><p>Atualize os dados do compromisso.</p></div><Link className="secondary-button" href="/admin/agenda">Voltar</Link></header><div className="admin-content"><AgendaForm item={item} /></div></>; }
