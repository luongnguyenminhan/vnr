'use client';

import { useState } from 'react';
import { FloatingBubbleChat } from '@/components/chat';
import { Header } from '@/components/layout';
import { ChapterI, ChapterII } from '@/components/ChapterContent';

type ChapterType = 'chapter1' | 'chapter2';

export default function Home() {
  const [currentChapter, setCurrentChapter] = useState<ChapterType>('chapter1');

  const handleChapterChange = (chapter: ChapterType) => {
    setCurrentChapter(chapter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Header onChapterChange={handleChapterChange} />


      {currentChapter === 'chapter1' && <ChapterI />}
      {currentChapter === 'chapter2' && <ChapterII />}

      {/* Floating Chat Component */}
      <FloatingBubbleChat />
    </div>
  );
}
