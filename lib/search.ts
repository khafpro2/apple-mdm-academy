import Fuse from 'fuse.js';
import { getAllCourses, MODULES, Course, Module } from './courses';

export interface SearchResult {
  type: 'course' | 'module';
  id: string;
  slug: string;
  title: string;
  description: string;
  moduleTitle?: string;
  moduleSlug?: string;
  level?: string;
  tools?: string[];
  score: number;
}

let courseIndex: Fuse<Course> | null = null;
let moduleIndex: Fuse<Module> | null = null;

function getCourseIndex(): Fuse<Course> {
  if (!courseIndex) {
    courseIndex = new Fuse(getAllCourses(), {
      keys: [
        { name: 'title',       weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'objectives',  weight: 0.1 },
        { name: 'tools',       weight: 0.1 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }
  return courseIndex;
}

function getModuleIndex(): Fuse<Module> {
  if (!moduleIndex) {
    moduleIndex = new Fuse(MODULES, {
      keys: [
        { name: 'title',       weight: 0.6 },
        { name: 'description', weight: 0.4 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }
  return moduleIndex;
}

export function search(query: string, limit = 12): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const courseResults = getCourseIndex().search(query, { limit: 10 });
  const moduleResults = getModuleIndex().search(query, { limit: 4 });

  const results: SearchResult[] = [];

  for (const r of courseResults) {
    const mod = MODULES.find((m) => m.id === r.item.moduleId);
    results.push({
      type: 'course',
      id: r.item.id,
      slug: r.item.slug,
      title: r.item.title,
      description: r.item.description,
      moduleTitle: r.item.moduleTitle,
      moduleSlug: mod?.slug,
      level: r.item.level,
      tools: r.item.tools as string[],
      score: r.score ?? 1,
    });
  }

  for (const r of moduleResults) {
    results.push({
      type: 'module',
      id: r.item.id,
      slug: r.item.slug,
      title: r.item.title,
      description: r.item.description,
      score: (r.score ?? 1) - 0.1, // slight boost over courses
    });
  }

  return results
    .sort((a, b) => a.score - b.score)
    .slice(0, limit);
}

// Invalidate on data changes
export function invalidateSearchIndex(): void {
  courseIndex = null;
  moduleIndex = null;
}
