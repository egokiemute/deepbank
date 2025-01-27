import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://flextable.co";
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/spaces', '/listing'],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}