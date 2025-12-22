import { dehydrate, QueryClient } from '@tanstack/react-query';
import api from "@/lib/api";
import type { SiteConfig } from '@/types/site-config'; // assume you have this

export async function prefetchSiteConfig() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['site-config'],
    queryFn: async () => {
      const { data } = await api.get<SiteConfig>("/site");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 10,   // 10 min
  });

  return dehydrate(queryClient);
}