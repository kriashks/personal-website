export function formatDate(dateValue: string): string {
	const date = new Date(`${dateValue}T00:00:00`);
	if (Number.isNaN(date.getTime())) return dateValue;

	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	}).format(date);
}
