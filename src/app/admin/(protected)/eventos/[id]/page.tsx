import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EventForm } from '@/components/admin/EventForm';
import { db } from '@/lib/db';
export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) { const item = await db.recentEvent.findUnique({ where: { id: (await params).id }, include: { images: { orderBy: { position: 'asc' } } } }); if (!item) notFound(); return <><header className="admin-topbar"><div><h1>Editar evento</h1><p>Atualize o registro da galeria.</p></div><Link className="secondary-button" href="/admin/eventos">Voltar</Link></header><div className="admin-content"><EventForm item={item} /></div></>; }
