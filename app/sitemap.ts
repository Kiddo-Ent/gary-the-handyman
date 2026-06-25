import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://garythehandyman.com.au";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/home-maintenance`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/technology`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/security-cameras`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/social-support`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ];
}