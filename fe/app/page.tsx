'use client';

import { useState } from 'react';
import { FloatingBubbleChat } from '@/components/chat';
import { Header } from '@/components/layout';
import { ChapterI, ChapterII, ChapterIII, ChapterIV } from '@/components/ChapterContent';

type ChapterType = 'chapter1' | 'chapter2' | 'chapter3' | 'chapter4';

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
      {currentChapter === 'chapter3' && <ChapterIII />}
      {currentChapter === 'chapter4' && <ChapterIV />}

      {/* Floating Chat Component */}
      <FloatingBubbleChat />
    </div>
  );
}
