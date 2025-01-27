import type { MetadataRoute } from "next";
import { fetchSpaces } from "@/utils/fetchSpaces";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://flextable.co";

  let response;
  try {
    response = await fetchSpaces();
  } catch (error) {
    console.error("Failed to fetch spaces:", error);
    response = [];
  }

  // const spaceDetails = response.map((space: any) => ({
  //   url: `${baseUrl}/spaces/${space.slug}?id=${space._id}`,
  //   lastModified: space.updatedAt,
  //   changeFrequency: "monthly",
  //   priority: 0.8,
  // }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    // ...spaceDetails,
    {
      url: `${baseUrl}/listing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/spaces`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
