import Link from 'next/link';
import { EventForm } from '@/components/admin/EventForm';
export default function NewEventPage() { return <><header className="admin-topbar"><div><h1>Novo evento</h1><p>Adicione um registro à galeria.</p></div><Link className="secondary-button" href="/admin/eventos">Voltar</Link></header><div className="admin-content"><EventForm /></div></>; }
