'use client';

import { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import LessonPlayer from '@/components/cours/LessonPlayer';
import Quiz from '@/components/cours/Quiz';
import { type Lesson } from '@/lib/courses';
import { type QuizQuestion } from '@/components/cours/Quiz';
import { markCourseComplete, recordVisit } from '@/lib/progress';

interface CourseInteractiveProps {
  courseSlug: string;
  mdxContent: string | null;
  lessons: Lesson[];
  quizQuestions: QuizQuestion[];
}

// Simple markdown-to-HTML renderer (no heavy MDX runtime needed)
function renderMarkdown(content: string): string {
  let html = content
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold / italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    // Blockquote
    .replace(/^&gt; (.*$)/gm, '<blockquote><p>$1</p></blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter((c) => c.trim() && !/^[\s\-:]+$/.test(c.trim()));
      return '<tr>' + cells.map((c) => `<td>${c.trim()}</td>`).join('') + '</tr>';
    })
    // Lists
    .replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Paragraphs
    .replace(/\n\n+/g, '</p><p>')
    .replace(/^(?!<[htplbuocri])/gm, '');

  // Wrap loose li in ul
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);
  // Wrap table rows in table
  html = html.replace(/(<tr>.*<\/tr>\n?)+/g, (m) => `<table>${m}</table>`);

  return `<p>${html}</p>`;
}

export default function CourseInteractive({
  courseSlug,
  mdxContent,
  lessons,
  quizQuestions,
}: CourseInteractiveProps) {


  useEffect(() => {
    recordVisit(courseSlug);
  }, [courseSlug]);

  const handleAllLessonsComplete = () => {
    if (quizQuestions.length === 0) {
      markCourseComplete(courseSlug);
    }
  };

  const handleQuizComplete = (score: number) => {
    if (score >= 70) {
      markCourseComplete(courseSlug);
    }
  };

  return (
    <div className="space-y-6">
      {/* MDX Content */}
      {mdxContent && (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(mdxContent) }}
        />
      )}

      {/* Lesson Player */}
      <div>
        {!mdxContent && (
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={15} className="text-indigo-400" />
            <h2 className="font-semibold text-white text-sm">Programme du cours</h2>
          </div>
        )}
        <LessonPlayer
          courseSlug={courseSlug}
          lessons={lessons}
          onAllComplete={handleAllLessonsComplete}
        />
      </div>

      {/* Quiz */}
      {quizQuestions.length > 0 && (
        <Quiz
          courseSlug={courseSlug}
          questions={quizQuestions}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
