const WORDS_PER_MINUTE = 210;

function toTitleCase(input: string): string {
	return input
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function estimateReadTimeMinutes(input: string): string {
	const words = input.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
	return `${minutes} min`;
}

export function fallbackTags(title: string, max = 3): string[] {
	const words = title
		.toLowerCase()
		.split(/[^a-z0-9]+/)
		.map((word) => word.trim())
		.filter((word) => word.length >= 4)
		.slice(0, max)
		.map((word) => toTitleCase(word));

	if (words.length > 0) {
		return words;
	}

	return ['Writing'];
}
