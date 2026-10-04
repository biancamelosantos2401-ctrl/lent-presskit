import Link from 'next/link';
import { SetForm } from '@/components/admin/SetForm';
export default function NewSetPage() { return <><header className="admin-topbar"><div><h1>Novo set</h1><p>Adicione um lançamento.</p></div><Link className="secondary-button" href="/admin/sets">Voltar</Link></header><div className="admin-content"><SetForm /></div></>; }
