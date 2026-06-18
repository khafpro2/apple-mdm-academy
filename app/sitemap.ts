import { MetadataRoute } from 'next';
import { getAllCourses, MODULES } from '@/lib/courses';

const BASE_URL = 'https://mdm-academy.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const courses = getAllCourses();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/parcours`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/modules`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const moduleRoutes: MetadataRoute.Sitemap = MODULES.map((m) => ({
    url: `${BASE_URL}/modules/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const courseRoutes: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${BASE_URL}/cours/${c.slug}`,
    lastModified: new Date(c.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...moduleRoutes, ...courseRoutes];
}
