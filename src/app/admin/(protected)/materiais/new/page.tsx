import Link from 'next/link';
import { ResourceForm } from '@/components/admin/ResourceForm';

export default function NewMaterialPage() { return <><header className="admin-topbar"><div><h1>Novo material</h1><p>Adicione um PDF para o menu público.</p></div><Link className="secondary-button" href="/admin/materiais">Voltar</Link></header><div className="admin-content"><ResourceForm /></div></>; }
