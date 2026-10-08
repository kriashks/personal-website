<script lang="ts">
	import type { ListItemComponentProps } from '@portabletext/svelte';
	import type { Snippet } from 'svelte';

	let { children }: { portableText: ListItemComponentProps; children?: Snippet } = $props();
</script>

<li>{@render children?.()}</li>
