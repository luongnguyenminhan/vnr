/**
 * Basic markdown parser for chat messages
 * Supports: h1-h6, bold, italic, lists, links, but excludes code blocks
 */

export function parseMarkdown(text: string): string {
    if (!text) return '';

    let parsed = text;

    // Headers (h1-h6)
    parsed = parsed.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>');
    parsed = parsed.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-2">$1</h2>');
    parsed = parsed.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-3">$1</h1>');
    parsed = parsed.replace(/^#### (.*$)/gim, '<h4 class="text-base font-semibold mb-1">$1</h4>');
    parsed = parsed.replace(/^##### (.*$)/gim, '<h5 class="text-sm font-semibold mb-1">$1</h5>');
    parsed = parsed.replace(/^###### (.*$)/gim, '<h6 class="text-xs font-semibold mb-1">$1</h6>');

    // Bold and italic
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    parsed = parsed.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    parsed = parsed.replace(/__(.*?)__/g, '<strong class="font-bold">$1</strong>');
    parsed = parsed.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

    // Strikethrough
    parsed = parsed.replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>');

    // Links
    parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Unordered lists
    parsed = parsed.replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>');
    parsed = parsed.replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>');
    parsed = parsed.replace(/^\+ (.*$)/gim, '<li class="ml-4">$1</li>');

    // Ordered lists
    parsed = parsed.replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>');

    // Wrap lists in ul/ol tags
    parsed = parsed.replace(/(<li class="ml-4">.*?<\/li>)/g, '<ul class="list-disc space-y-1 my-2">$1</ul>');

    // Line breaks
    parsed = parsed.replace(/\n/g, '<br>');

    // Clean up multiple consecutive <br> tags
    parsed = parsed.replace(/(<br>){3,}/g, '<br><br>');

    return parsed;
}
