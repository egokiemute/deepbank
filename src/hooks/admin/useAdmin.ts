import { useVariables } from "@/store/variables";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllFetchSpaces = (slug?: string, id?: string) => {
  const { limit, day, page, category, city } = useVariables(); // Ensure sensible defaults

  const fetchAllSpaces = async (
    slug?: string,
    id?: string,
    page?: number,
    limit?: number,
    category?: string,
    city?: string,
    day?: string,
  ) => {
    const params = new URLSearchParams();

    if (slug) params.append("slug", slug);
    if (id) params.append("id", id);
    if (day) params.append("day", day);
    if (category) params.append("category", category);
    if (city) params.append("city", city);
    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());

    const url = `/api/admin/space?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["spaces", id, slug, page, limit, category, city, day],
    queryFn: () => fetchAllSpaces(slug, id, page, limit, category, city, day),
  });
};
