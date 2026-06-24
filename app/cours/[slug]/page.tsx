import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, Clock, Calendar, Target, BookOpen,
  Award, ArrowLeft, ArrowRight, CheckCircle, FileText, Terminal
} from 'lucide-react';
import { getAllCourses, getCourseBySlug, getAdjacentCourses, getModuleForCourse } from '@/lib/courses';
import { LevelBadge, StatusBadge, ToolBadge } from '@/components/ui/Badges';
import { getMDXContent, hasMDXContent } from '@/lib/mdx';
import { getQuizForCourse } from '@/lib/quizzes';
import { getCertificationById } from '@/lib/certifications';
import { getOfficialLinks, getJamfOfficialSourcesForCourse, getModernAppleSourcesForCourse, isJamfProDocumentedCourse, isJamfEnrichedCourse } from '@/lib/official-links';
import { getLabsForCourse } from '@/lib/labs';
import CertificationIcon from '@/components/certifications/CertificationIcon';
import OfficialLinksPanel from '@/components/cours/OfficialLinksPanel';
import JamfOfficialSourceBlock from '@/components/cours/JamfOfficialSourceBlock';
import ModernAppleSourceBlock from '@/components/cours/ModernAppleSourceBlock';
import ModuleIcon from '@/components/icons/ModuleIcon';
import CourseInteractive from './CourseInteractive';

export async function generateStaticParams() {
  return getAllCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  return course
    ? { title: `${course.title} — MDM Academy`, description: course.description }
    : { title: 'Cours introuvable' };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const { prev, next } = getAdjacentCourses(slug);
  const courseModule = getModuleForCourse(course);
  const mdxContent = getMDXContent(slug);
  const quizQuestions = getQuizForCourse(slug);
  const hasContent = hasMDXContent(slug);
  const officialLinks = getOfficialLinks(slug);
  const jamfOfficialSources = getJamfOfficialSourcesForCourse(slug);
  const modernAppleSources = getModernAppleSourcesForCourse(slug);
  const showJamfDocNote = isJamfProDocumentedCourse(slug) || isJamfEnrichedCourse(slug);
  const courseLabs = getLabsForCourse(slug);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5A6478] mb-8 flex-wrap">
        <Link href="/" className="hover:text-gray-400">Accueil</Link>
        <ChevronRight size={11} />
        <Link href="/parcours" className="hover:text-gray-400">Parcours</Link>
        {courseModule && (
          <>
            <ChevronRight size={11} />
            <Link href={`/modules/${courseModule.slug}`} className="hover:text-gray-400 hidden sm:inline">
              {course.moduleTitle}
            </Link>
          </>
        )}
        <ChevronRight size={11} className="hidden sm:inline" />
        <span className="text-gray-400 truncate max-w-[180px]">{course.title}</span>
      </div>

      {/* Course header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-indigo-400 font-medium">{course.moduleTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
          {course.title}
        </h1>
        <p className="text-sm text-[#9AA2B4] leading-relaxed mb-5 max-w-2xl">{course.description}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <LevelBadge level={course.level} size="md" />
          <StatusBadge status={course.status} size="md" />
          <div className="flex items-center gap-1.5 text-sm text-[#5A6478]">
            <Clock size={13} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#5A6478]">
            <BookOpen size={13} />
            <span>{course.lessons.length} leçon{course.lessons.length > 1 ? 's' : ''}</span>
          </div>
          {quizQuestions.length > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-indigo-400/70">
              <Award size={13} />
              <span>Quiz {quizQuestions.length} questions</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-[#3A4156]">
            <Calendar size={11} />
            <span>{new Date(course.lastUpdated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2">
          {course.tools.map((tool) => <ToolBadge key={tool} tool={tool} />)}
        </div>
      </header>

      {/* Content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Objectives */}
          <section className="rounded-2xl border border-white/7 bg-[#0D1117] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target size={15} className="text-indigo-400" />
              <h2 className="font-semibold text-white text-sm">Objectifs d&apos;apprentissage</h2>
            </div>
            <ul className="space-y-2.5">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-[#9AA2B4] leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <section className="rounded-2xl border border-white/7 bg-[#0D1117] p-5">
              <h2 className="font-semibold text-white text-sm mb-3">Prérequis</h2>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map((prereq) => {
                  const found = getAllCourses().find((c) => c.slug === prereq);
                  return found ? (
                    <Link
                      key={prereq}
                      href={`/cours/${prereq}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/8 bg-white/3 text-xs text-gray-400 hover:text-white hover:border-white/15 transition-colors"
                    >
                      <BookOpen size={11} />
                      {found.title}
                    </Link>
                  ) : (
                    <span key={prereq} className="px-3 py-1.5 rounded-xl border border-white/8 bg-white/3 text-xs text-gray-500">{prereq}</span>
                  );
                })}
              </div>
            </section>
          )}

          {/* MDX Content or Lesson List */}
          {hasContent && mdxContent ? (
            <section className="rounded-2xl border border-white/7 bg-[#0D1117] p-6">
              <div className="flex items-center gap-2 mb-5">
                <FileText size={15} className="text-indigo-400" />
                <h2 className="font-semibold text-white text-sm">Contenu du cours</h2>
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: '' }} />
              {/* MDX rendered client-side */}
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
        <div className="space-y-4">
          {/* Quick info */}
          <div className="rounded-2xl border border-white/7 bg-[#0D1117] p-4 space-y-3">
            <h3 className="text-[10px] font-semibold text-[#5A6478] uppercase tracking-widest">Informations</h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <dt className="text-[#3A4156]">Durée</dt>
                <dd className="text-gray-300 font-medium">{course.duration}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-[#3A4156]">Niveau</dt>
                <dd><LevelBadge level={course.level} /></dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-[#3A4156]">Leçons</dt>
                <dd className="text-gray-300 font-medium">{course.lessons.length}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-[#3A4156]">Statut</dt>
                <dd><StatusBadge status={course.status} /></dd>
              </div>
              {quizQuestions.length > 0 && (
                <div className="flex justify-between items-center">
                  <dt className="text-[#3A4156]">Quiz</dt>
                  <dd className="text-indigo-400 font-medium">{quizQuestions.length} questions</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Certifications */}
          {course.certificationRelated.length > 0 && (
            <div className="rounded-2xl border border-yellow-500/15 bg-yellow-500/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award size={13} className="text-yellow-400" />
                <h3 className="text-[10px] font-semibold text-yellow-500/70 uppercase tracking-widest">Certifications</h3>
              </div>
              <ul className="space-y-2">
                {course.certificationRelated.map((cert) => {
                  const meta = getCertificationById(cert);
                  return (
                    <li key={cert}>
                      <Link
                        href={meta ? `/certifications#${meta.slug}` : '/certifications'}
                        className="flex items-center gap-2 text-xs text-yellow-400/80 hover:text-yellow-300 transition-colors"
                      >
                        {meta && (
                          <CertificationIcon
                            src={meta.iconSrc}
                            size={18}
                            className="h-[18px] w-[18px]"
                          />
                        )}
                        <span className="leading-snug">{cert}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {courseLabs.length > 0 && (
            <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Terminal size={13} className="text-emerald-400" />
                <h3 className="text-[10px] font-semibold text-emerald-500/70 uppercase tracking-widest">
                  Lab{courseLabs.length > 1 ? 's' : ''} interactif{courseLabs.length > 1 ? 's' : ''}
                </h3>
              </div>
              <ul className="space-y-2">
                {courseLabs.map((lab) => (
                  <li key={lab.id}>
                    <Link
                      href={`/labs/${lab.id}`}
                      className="flex flex-col gap-0.5 text-xs text-emerald-400/80 hover:text-emerald-300 transition-colors"
                    >
                      <span className="font-medium leading-snug">{lab.title}</span>
                      <span className="text-[10px] text-emerald-500/50">{lab.level} · +{lab.xpReward} XP</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ModernAppleSourceBlock sources={modernAppleSources} />

          <JamfOfficialSourceBlock sources={jamfOfficialSources} />

          <OfficialLinksPanel links={officialLinks} showJamfNote={showJamfDocNote && jamfOfficialSources.length === 0 && modernAppleSources.length === 0} />

          {/* Module link */}
          {courseModule && (
            <Link
              href={`/modules/${courseModule.slug}`}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl border border-white/7 bg-[#0D1117] text-xs text-[#5A6478] hover:text-gray-300 hover:border-white/12 transition-colors"
            >
              <ModuleIcon moduleSlug={courseModule.slug} size={24} className="h-6 w-6" />
              <div className="min-w-0">
                <p className="text-[10px] text-[#3A4156]">Module</p>
                <p className="font-medium text-gray-400 truncate">{courseModule.title}</p>
              </div>
              <ChevronRight size={12} className="ml-auto shrink-0" />
            </Link>
          )}

          {/* Back to parcours */}
          <Link
            href="/parcours"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#0D1117] text-xs text-[#5A6478] hover:text-gray-300 hover:border-white/12 transition-colors"
          >
            ← Retour au parcours
          </Link>
        </div>
      </div>

      {/* Prev / Next navigation */}
      <nav className="mt-10 flex flex-col sm:flex-row gap-3">
        {prev && (
          <Link
            href={`/cours/${prev.slug}`}
            className="flex-1 flex items-center gap-3 p-4 rounded-2xl border border-white/7 bg-[#0D1117] hover:border-white/12 hover:bg-[#131720] transition-all group"
          >
            <ArrowLeft size={15} className="text-[#3A4156] group-hover:text-indigo-400 shrink-0 transition-colors" />
            <div className="min-w-0">
              <p className="text-[10px] text-[#3A4156] mb-0.5">Cours précédent</p>
              <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors truncate">{prev.title}</p>
            </div>
          </Link>
        )}
        {next && (
          <Link
            href={`/cours/${next.slug}`}
            className="flex-1 flex items-center justify-end gap-3 p-4 rounded-2xl border border-white/7 bg-[#0D1117] hover:border-white/12 hover:bg-[#131720] transition-all group text-right"
          >
            <div className="min-w-0">
              <p className="text-[10px] text-[#3A4156] mb-0.5">Cours suivant</p>
              <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors truncate">{next.title}</p>
            </div>
            <ArrowRight size={15} className="text-[#3A4156] group-hover:text-indigo-400 shrink-0 transition-colors" />
          </Link>
        )}
      </nav>
    </div>
  );
}
