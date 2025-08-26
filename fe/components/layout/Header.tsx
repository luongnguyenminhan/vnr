'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiBook } from 'react-icons/fi';

type ChapterType = 'Landing' | 'ChapterII' | 'ChapterIII' | 'ChapterI';

interface HeaderProps {
    title?: string;
    showNavigation?: boolean;
    onChapterChange?: (chapter: ChapterType) => void;
}

export default function Header({ title = "Việt Nam thời Bao Cấp", showNavigation = true, onChapterChange }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigation = [
        { name: 'Mở đầu', href: 'Landing' as ChapterType, icon: FiBook, isChapter: true },
        { name: 'Phần I', href: 'ChapterI' as ChapterType, icon: FiBook, isChapter: true },
        { name: 'Phần II', href: 'ChapterII' as ChapterType, icon: FiBook, isChapter: true },
        { name: 'Phần III', href: 'ChapterIII' as ChapterType, icon: FiBook, isChapter: true },
    ];

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <span className="text-white font-bold text-lg">V</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {title}
                            </h1>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                So sánh Việt Nam thời bao cấp và ngày nay
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    {showNavigation && (
                        <nav className="hidden md:flex items-center space-x-8">
                            {navigation.map((item) => (
                                item.isChapter ? (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            if (item.isChapter) {
                                                onChapterChange?.(item.href as ChapterType);
                                            }
                                        }}
                                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.name}
                                    </button>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.name}
                                    </Link>
                                )
                            ))}
                        </nav>
                    )}

                    {/* Mobile menu button */}
                    {showNavigation && (
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <FiX className="w-5 h-5" />
                            ) : (
                                <FiMenu className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>

                {/* Mobile Navigation Menu */}
                {showNavigation && isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                        <nav className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                item.isChapter ? (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            if (item.isChapter) {
                                                onChapterChange?.(item.href as ChapterType);
                                            }
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.name}
                                    </button>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                )
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
