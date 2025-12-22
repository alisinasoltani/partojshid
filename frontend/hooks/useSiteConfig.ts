// hooks/useSiteConfig.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { SiteConfig } from "@/types/site-config";

const fetchSiteConfig = async (): Promise<SiteConfig> => {
  const { data } = await api.get<SiteConfig>("/site");
  return data;
};

export const useSiteConfig = () => {
  return useQuery<SiteConfig, Error>({
    queryKey: ["site-config"],
    queryFn: fetchSiteConfig,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
