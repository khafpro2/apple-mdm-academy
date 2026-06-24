import Link from 'next/link';
import { ChevronRight, Trophy, Clock, BookOpen } from 'lucide-react';
import { MODULES, getAllCourses } from '@/lib/courses';
import {
  CERTIFICATIONS,
  CERTIFICATION_COUNT,
  PROVIDER_ICONS,
  getPrepCourseIcon,
} from '@/lib/certifications';
import CertificationCard from '@/components/certifications/CertificationCard';
import CertificationIcon from '@/components/certifications/CertificationIcon';

export const metadata = { title: 'Certifications professionnelles' };

const LEVEL_COLORS: Record<string, string> = {
  Débutant: 'bg-emerald-500/15 text-emerald-400',
  Intermédiaire: 'bg-blue-500/15 text-blue-400',
  Avancé: 'bg-amber-500/15 text-amber-400',
  Expert: 'bg-red-500/15 text-red-400',
};

export default function CertificationsPage() {
  const certModule = MODULES.find((m) => m.id === 'module-9');
  const allCourses = getAllCourses();

  const appleCerts = CERTIFICATIONS.filter((c) => c.provider === 'Apple');
  const jamfCerts = CERTIFICATIONS.filter((c) => c.provider === 'Jamf');
  const microsoftCerts = CERTIFICATIONS.filter((c) => c.provider === 'Microsoft');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-300">Accueil</Link>
        <ChevronRight size={12} />
        <span className="text-gray-300">Certifications</span>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-yellow-400" size={22} />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Certifications professionnelles</h1>
        </div>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          {CERTIFICATION_COUNT} parcours Apple Professional Training, Jamf Training et Microsoft Learn,
          avec cours de préparation pour les certifications clés. Les pictogrammes sont éditoriaux
          et ne reproduisent pas les badges ou logos officiels.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          <CertificationIcon src={PROVIDER_ICONS.Apple} size={24} className="h-6 w-6" />
          Apple Professional Training
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appleCerts.map((cert) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              relatedCourseCount={allCourses.filter((c) => c.certificationRelated.includes(cert.id)).length}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          <CertificationIcon src={PROVIDER_ICONS.Jamf} size={24} className="h-6 w-6" />
          Jamf Training
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jamfCerts.map((cert) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              relatedCourseCount={allCourses.filter((c) => c.certificationRelated.includes(cert.id)).length}
            />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          <CertificationIcon src={PROVIDER_ICONS.Microsoft} size={24} className="h-6 w-6" />
          Microsoft Learn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {microsoftCerts.map((cert) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              relatedCourseCount={allCourses.filter((c) => c.certificationRelated.includes(cert.id)).length}
            />
          ))}
        </div>
      </section>

      {certModule && (
        <section>
          <h2 className="text-lg font-bold text-white mb-2">Cours de préparation aux examens</h2>
          <p className="text-sm text-gray-500 mb-6">
            Module {certModule.order} — guides de révision et entraînements pour les certifications principales
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certModule.courses.map((course) => (
              <Link
                key={course.id}
                href={`/cours/${course.slug}`}
                className="group flex flex-col p-4 rounded-xl border border-white/5 bg-[#161920] hover:border-yellow-500/30 hover:bg-[#1a1d28] transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CertificationIcon
                    src={getPrepCourseIcon(course.slug)}
                    size={22}
                    className="h-[22px] w-[22px]"
                  />
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[course.level]}`}>
                    {course.level}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white mb-2 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{course.description}</p>
                <div className="mt-auto flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen size={11} />{course.lessons.length} leçons</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
