import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/admin/login');
  return <AdminShell email={session.user.email}>{children}</AdminShell>;
}
