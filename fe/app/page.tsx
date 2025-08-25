'use client';

import { useState } from 'react';
import { FloatingBubbleChat } from '@/components/chat';
import { Header } from '@/components/layout';
import { Landing, ChapterII, ChapterIII, ChapterIV } from '@/components/ChapterContent';

type ChapterType = 'Landing' | 'ChapterII' | 'ChapterIII' | 'ChapterIV';

export default function Home() {
  const [currentChapter, setCurrentChapter] = useState<ChapterType>('Landing');

  const handleChapterChange = (chapter: ChapterType) => {
    setCurrentChapter(chapter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header onChapterChange={handleChapterChange} />


      {currentChapter === 'Landing' && <Landing />}
      {currentChapter === 'ChapterII' && <ChapterII />}
      {currentChapter === 'ChapterIII' && <ChapterIII />}
      {currentChapter === 'ChapterIV' && <ChapterIV />}

      {/* Floating Chat Component */}
      <FloatingBubbleChat />
    </div>
  );
}
