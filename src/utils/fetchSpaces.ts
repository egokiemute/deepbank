import axios from "axios";

export async function fetchSpaces(slug?: string, id?: string, page?: number, limit?: number) {
  const params = new URLSearchParams();

  if (slug) params.append("slug", slug);
  if (id) params.append("id", id);
  if (limit) params.append("limit", limit.toString());
  if (page) params.append("page", page.toString());

  const url = `/api/admin/space?${params.toString()}`;
  const response = await axios.get(url);
  return response.data;
}
