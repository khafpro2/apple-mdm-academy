import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, Clock, Calendar, Target, BookOpen,
  Award, ArrowLeft, ArrowRight, CheckCircle, FileText,
  Layers, Shield
} from 'lucide-react';
import {
  getAllCourses, getCourseBySlug, getAdjacentCourses,
  getModuleForCourse
} from '@/lib/courses';
import { LevelBadge, StatusBadge, ToolBadge } from '@/components/ui/Badges';
import { getMDXContent, hasMDXContent } from '@/lib/mdx';
import { getQuizForCourse } from '@/lib/quizzes';
import CourseInteractive from './CourseInteractive';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  return course
    ? {
        title: `${course.title} — MDM Academy`,
        description: course.description,
      }
    : { title: 'Cours introuvable' };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const { prev, next } = getAdjacentCourses(slug);
  const courseModule = getModuleForCourse(course);
  const mdxContent = getMDXContent(slug);
  const quizQuestions = getQuizForCourse(slug);
  const hasContent = hasMDXContent(slug);
  const allCourses = getAllCourses();

  // Progression dans le module
  const moduleCoursesAll = courseModule?.courses ?? [];
  const courseIndexInModule = moduleCoursesAll.findIndex((c) => c.slug === slug);
  const coursePosInModule = courseIndexInModule + 1;

  const formattedDate = new Date(course.lastUpdated).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1.5 text-xs text-gray-600 mb-6 sm:mb-8 flex-wrap"
        aria-label="Fil d'Ariane"
      >
        <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
        <ChevronRight size={11} />
        <Link href="/parcours" className="hover:text-gray-300 transition-colors">Parcours</Link>
        {courseModule && (
          <>
            <ChevronRight size={11} />
            <Link
              href={`/modules/${courseModule.slug}`}
              className="hover:text-gray-300 transition-colors hidden sm:inline truncate max-w-[180px]"
            >
              {courseModule.title}
            </Link>
          </>
        )}
        <ChevronRight size={11} className="hidden sm:inline" />
        <span className="text-gray-400 truncate max-w-[160px] sm:max-w-[250px]">{course.title}</span>
      </nav>

      {/* Barre de progression module */}
      {courseModule && moduleCoursesAll.length > 1 && (
        <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-xl border border-white/6 bg-white/[0.015]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">{courseModule.icon}</span>
              <span className="text-xs font-semibold text-gray-400 truncate max-w-[160px] sm:max-w-none">
                {courseModule.title}
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-600 shrink-0 ml-2">
              {coursePosInModule}/{moduleCoursesAll.length}
            </span>
          </div>
          {/* Barre de progression visuelle */}
          <div className="flex gap-0.5 mt-2">
            {moduleCoursesAll.map((c, i) => (
              <Link
                key={c.id}
                href={`/cours/${c.slug}`}
                title={c.title}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i < courseIndexInModule
                    ? 'bg-emerald-500'
                    : i === courseIndexInModule
                    ? 'bg-indigo-500'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* En-tête du cours */}
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
          {course.moduleTitle}
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight mb-4">
          {course.title}
        </h1>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-2xl">
          {course.description}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <LevelBadge level={course.level} size="md" />
          <StatusBadge status={course.status} size="md" />
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock size={12} />{course.duration}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <BookOpen size={12} />{course.lessons.length} leçon{course.lessons.length !== 1 ? 's' : ''}
          </span>
          {quizQuestions.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-indigo-400">
              <Award size={12} />Quiz · {quizQuestions.length} question{quizQuestions.length !== 1 ? 's' : ''}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <Calendar size={11} />Mis à jour le {formattedDate}
          </span>
        </div>

        {/* Outils */}
        {course.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {course.tools.map((tool) => <ToolBadge key={tool} tool={tool} />)}
          </div>
        )}
      </header>

      {/* Layout : contenu principal + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">

        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-4">

          {/* Objectifs */}
          <section className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target size={14} className="text-indigo-400 shrink-0" />
              <h2 className="font-semibold text-white text-sm">Objectifs d&apos;apprentissage</h2>
            </div>
            <ul className="space-y-2.5">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400 leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Prérequis */}
          {course.prerequisites.length > 0 && (
            <section className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
              <h2 className="font-semibold text-white text-sm mb-3">Prérequis recommandés</h2>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map((prereq) => {
                  const found = allCourses.find((c) => c.slug === prereq);
                  return found ? (
                    <Link
                      key={prereq}
                      href={`/cours/${prereq}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/8 bg-white/[0.02] text-xs text-gray-400 hover:text-white hover:border-white/15 transition-colors"
                    >
                      <BookOpen size={10} />{found.title}
                    </Link>
                  ) : (
                    <span key={prereq} className="px-3 py-1.5 rounded-xl border border-white/6 text-xs text-gray-600">
                      {prereq}
                    </span>
                  );
                })}
              </div>
            </section>
          )}

          {/* Contenu MDX + quiz interactif */}
          {hasContent && mdxContent ? (
            <section className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-2 mb-5">
                <FileText size={14} className="text-indigo-400" />
                <h2 className="font-semibold text-white text-sm">Contenu du cours</h2>
              </div>
              <CourseInteractive
                courseSlug={slug}
                mdxContent={mdxContent.content}
                lessons={course.lessons}
                quizQuestions={quizQuestions}
              />
            </section>
          ) : (
            <CourseInteractive
              courseSlug={slug}
              mdxContent={null}
              lessons={course.lessons}
              quizQuestions={quizQuestions}
            />
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">

          {/* Infos rapides */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">
              Informations
            </h3>
            <dl className="space-y-3">
              {[
                { label: 'Durée',  value: course.duration },
                { label: 'Leçons', value: `${course.lessons.length}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <dt className="text-gray-600 text-xs">{label}</dt>
                  <dd className="text-gray-300 font-medium text-xs">{value}</dd>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <dt className="text-gray-600 text-xs">Niveau</dt>
                <dd><LevelBadge level={course.level} /></dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-gray-600 text-xs">Statut</dt>
                <dd><StatusBadge status={course.status} /></dd>
              </div>
              {quizQuestions.length > 0 && (
                <div className="flex justify-between items-center">
                  <dt className="text-gray-600 text-xs">Quiz</dt>
                  <dd className="text-indigo-400 font-medium text-xs">{quizQuestions.length} questions</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Certifications */}
          {course.certificationRelated.length > 0 && (
            <div className="rounded-2xl border border-amber-500/15 bg-amber-500/4 p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Award size={12} className="text-amber-400" />
                <h3 className="text-[10px] font-bold text-amber-500/70 uppercase tracking-widest">
                  Certifications préparées
                </h3>
              </div>
              <ul className="space-y-2">
                {course.certificationRelated.map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-xs text-amber-400/80">
                    <span className="w-1 h-1 rounded-full bg-amber-500/50 mt-1.5 shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
              <Link
                href="/certifications"
                className="mt-3 flex items-center gap-1 text-[10px] text-amber-500/60 hover:text-amber-400 transition-colors"
              >
                <Shield size={9} /> Voir toutes les certifications
              </Link>
            </div>
          )}

          {/* Module link */}
          {courseModule && (
            <Link
              href={`/modules/${courseModule.slug}`}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all group"
            >
              <span className="text-xl">{courseModule.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-600 mb-0.5">Module parent</p>
                <p className="text-xs font-medium text-gray-400 group-hover:text-white truncate transition-colors">
                  {courseModule.title}
                </p>
              </div>
              <ChevronRight size={12} className="text-gray-700 group-hover:text-gray-400 shrink-0" />
            </Link>
          )}

          {/* Leçons (sidebar desktop) */}
          {course.lessons.length > 0 && (
            <div className="hidden lg:block rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Layers size={12} className="text-gray-500" />
                <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  Leçons du cours
                </h3>
              </div>
              <ol className="space-y-2">
                {course.lessons.map((lesson, i) => (
                  <li key={lesson.id} className="flex items-start gap-2.5">
                    <span className="text-[10px] text-gray-700 font-mono mt-0.5 w-4 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 leading-snug">{lesson.title}</p>
                      <p className="text-[10px] text-gray-600 mt-0.5">{lesson.duration}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Retour parcours */}
          <Link
            href="/parcours"
            className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.02] text-xs text-gray-500 hover:text-gray-300 hover:border-white/15 transition-colors"
          >
            <ArrowLeft size={12} /> Retour au parcours
          </Link>
        </aside>
      </div>

      {/* Navigation prev/next */}
      {(prev || next) && (
        <nav
          className="mt-10 sm:mt-12 pt-8 border-t border-white/6"
          aria-label="Navigation cours"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {prev ? (
              <Link
                href={`/cours/${prev.slug}`}
                className="flex-1 flex items-center gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all group"
              >
                <ArrowLeft size={14} className="text-gray-600 group-hover:text-indigo-400 shrink-0 transition-colors" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600 mb-0.5">Cours précédent</p>
                  <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors truncate">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : <div className="flex-1 hidden sm:block" />}

            {next && (
              <Link
                href={`/cours/${next.slug}`}
                className="flex-1 flex items-center justify-end gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all group text-right"
              >
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600 mb-0.5">Cours suivant</p>
                  <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors truncate">
                    {next.title}
                  </p>
                </div>
                <ArrowRight size={14} className="text-gray-600 group-hover:text-indigo-400 shrink-0 transition-colors" />
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
