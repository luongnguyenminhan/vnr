/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

interface CardProps {
    content: {
        type: 'text' | 'image';
        data: string;
        title?: string;
        icon?: React.ReactNode;
        className?: string;
    };
    className?: string;
}

// Enhanced markdown parser function
function parseMarkdown(text: string): React.ReactNode[] {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let inList = false;

    // Function to parse inline markdown formatting
    function parseInlineMarkdown(text: string): React.ReactNode {
        // Handle bold text (**text**)
        const boldRegex = /\*\*(.*?)\*\*/g;
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            // Add the bold text
            parts.push(<strong key={`bold-${match.index}`} className="font-semibold text-gray-900 dark:text-white">{match[1]}</strong>);
            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    }

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        if (!trimmedLine) {
            if (inList) {
                elements.push(
                    <ul key={`list-${index}`} className="space-y-1 mb-3">
                        {currentList.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                                <span>{parseInlineMarkdown(item)}</span>
                            </li>
                        ))}
                    </ul>
                );
                currentList = [];
                inList = false;
            }
            elements.push(<br key={`br-${index}`} />);
            return;
        }

        // Headers
        if (trimmedLine.startsWith('# ')) {
            if (inList) {
                elements.push(
                    <ul key={`list-${index}`} className="space-y-1 mb-3">
                        {currentList.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                                <span>{parseInlineMarkdown(item)}</span>
                            </li>
                        ))}
                    </ul>
                );
                currentList = [];
                inList = false;
            }
            elements.push(
                <h1 key={index} className="text-xl font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-600 pb-2">
                    {parseInlineMarkdown(trimmedLine.substring(2))}
                </h1>
            );
        } else if (trimmedLine.startsWith('## ')) {
            if (inList) {
                elements.push(
                    <ul key={`list-${index}`} className="space-y-1 mb-3">
                        {currentList.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                                <span>{parseInlineMarkdown(item)}</span>
                            </li>
                        ))}
                    </ul>
                );
                currentList = [];
                inList = false;
            }
            elements.push(
                <h2 key={index} className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {parseInlineMarkdown(trimmedLine.substring(3))}
                </h2>
            );
        } else if (trimmedLine.startsWith('### ')) {
            if (inList) {
                elements.push(
                    <ul key={`list-${index}`} className="space-y-1 mb-3">
                        {currentList.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                                <span>{parseInlineMarkdown(item)}</span>
                            </li>
                        ))}
                    </ul>
                );
                currentList = [];
                inList = false;
            }
            elements.push(
                <h3 key={index} className="text-base font-medium text-gray-900 dark:text-white mb-2">
                    {parseInlineMarkdown(trimmedLine.substring(4))}
                </h3>
            );
        }
        // Bullet points
        else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
            currentList.push(trimmedLine.substring(2));
            inList = true;
        }
        // Normal paragraphs
        else {
            if (inList) {
                elements.push(
                    <ul key={`list-${index}`} className="space-y-1 mb-3">
                        {currentList.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                                <span>{parseInlineMarkdown(item)}</span>
                            </li>
                        ))}
                    </ul>
                );
                currentList = [];
                inList = false;
            }
            elements.push(
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 last:mb-0">
                    {parseInlineMarkdown(trimmedLine)}
                </p>
            );
        }
    });

    // Handle remaining list items
    if (inList && currentList.length > 0) {
        elements.push(
            <ul key="final-list" className="space-y-1 mb-3">
                {currentList.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
                        <span>{parseInlineMarkdown(item)}</span>
                    </li>
                ))}
            </ul>
        );
    }

    return elements;
}

export default function Card({ content, className = "" }: CardProps) {
    const { type, data, title, icon, className: contentClassName } = content;

    const baseClasses = "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300";
    const combinedClasses = `${baseClasses} ${className}`;

    if (type === 'image') {
        return (
            <div className={combinedClasses}>
                {title && (
                    <div className="flex items-center gap-2 mb-4">
                        {icon && <span className="text-blue-600 dark:text-blue-400">{icon}</span>}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                    </div>
                )}
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                        src={data}
                        alt={title || "Hình ảnh"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU1RTUiLz48dGV4dCB4PSIxMDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUFBOUE5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNtZW0iPkhpbmggxJHhuqNpPC90ZXh0Pjwvc3ZnPg==';
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={combinedClasses}>
            {title && (
                <div className="flex items-center gap-2 mb-4">
                    {icon && <span className="text-blue-600 dark:text-blue-400">{icon}</span>}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                </div>
            )}
            <div className={`max-w-none ${contentClassName || ''}`}>
                {parseMarkdown(data)}
            </div>
        </div>
    );
}