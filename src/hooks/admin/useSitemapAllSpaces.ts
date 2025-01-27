import { useVariables } from "@/store/variables";
import { useQuery } from "@tanstack/react-query";
import { fetchSpaces } from "@/utils/fetchSpaces";

export const useSitemapAllSpaces = (slug?: string, id?: string) => {
  const { limit, page } = useVariables();

  return useQuery({
    queryKey: ["spaces", id, slug, page, limit],
    queryFn: () => fetchSpaces(slug, id, page, limit),
  });
};
