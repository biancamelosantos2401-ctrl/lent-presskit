import { PublicSite } from '@/components/public/PublicSite';
import { getPublicSiteData } from '@/lib/site-data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await getPublicSiteData();
  return <PublicSite data={data} />;
}
