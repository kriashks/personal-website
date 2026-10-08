import type { PortableTextBlock } from '@portabletext/types';

const WORDS_PER_MINUTE = 210;

export function plainText(blocks: PortableTextBlock[] | undefined): string {
	if (!blocks) return '';
	return blocks
		.map((block) => {
			if (block._type !== 'block' || !Array.isArray(block.children)) return '';
			return block.children.map((child) => (child as { text?: string }).text ?? '').join('');
		})
		.join('\n');
}

export function readTime(text: string): string {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
	return `${minutes} min read`;
}
