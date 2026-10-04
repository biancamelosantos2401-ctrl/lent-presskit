import Link from 'next/link';
import { AgendaForm } from '@/components/admin/AgendaForm';
export default function NewAgendaPage() { return <><header className="admin-topbar"><div><h1>Nova agenda</h1><p>Cadastre um próximo compromisso.</p></div><Link className="secondary-button" href="/admin/agenda">Voltar</Link></header><div className="admin-content"><AgendaForm /></div></>; }
