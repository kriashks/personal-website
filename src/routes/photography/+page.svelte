<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { PHOTOGRAPHY_ALBUMS, type Album } from '$lib/data/photography';

	let selectedAlbum = $state<Album | null>(null);
	let currentPhotoIndex = $state(0);
	let photoViewerTopOffset = $state(80);

	const currentPhoto = $derived(
		selectedAlbum ? selectedAlbum.photos[currentPhotoIndex % selectedAlbum.photos.length] : null
	);

	const closeButtonTopOffset = $derived(Math.max(photoViewerTopOffset - 8, 16));

	const updatePhotoViewerTopOffset = (): void => {
		if (typeof document === 'undefined') return;

		const siteNav = document.querySelector<HTMLElement>('.site-nav');
		const siteNavHeight = siteNav?.getBoundingClientRect().height ?? 0;

		photoViewerTopOffset = Math.ceil(siteNavHeight) + 24;
	};

	const openAlbum = (album: Album): void => {
		selectedAlbum = album;
		currentPhotoIndex = 0;
		updatePhotoViewerTopOffset();
	};

	const closeAlbum = (): void => {
		selectedAlbum = null;
		currentPhotoIndex = 0;
	};

	const showPreviousPhoto = (): void => {
		if (!selectedAlbum) return;
		currentPhotoIndex =
			(currentPhotoIndex - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length;
	};

	const showNextPhoto = (): void => {
		if (!selectedAlbum) return;
		currentPhotoIndex = (currentPhotoIndex + 1) % selectedAlbum.photos.length;
	};

	const handleWindowKeydown = (event: KeyboardEvent): void => {
		if (!selectedAlbum) return;

		if (event.key === 'Escape') {
			closeAlbum();
		}

		if (event.key === 'ArrowLeft') {
			showPreviousPhoto();
		}

		if (event.key === 'ArrowRight') {
			showNextPhoto();
		}
	};

	const handleWindowResize = (): void => {
		if (!selectedAlbum) return;
		updatePhotoViewerTopOffset();
	};
</script>

<svelte:head>
	<title>Photography | Adarsh Krishnan</title>
	<meta name="description" content="Photography albums by Adarsh Krishnan." />
	<link rel="canonical" href="https://adarshkrishnan.com/photography/" />
</svelte:head>

<svelte:window onkeydown={handleWindowKeydown} onresize={handleWindowResize} />

<section class="page-shell">
	<header class="mb-12 sm:mb-16">
		<p class="terminal-command mb-4">$ ls -la ./albums/</p>
		<h1 class="terminal-heading mb-4 text-4xl sm:text-5xl md:text-6xl">Photography</h1>
		<p class="inline-flex items-center gap-2 text-base text-gray-400 sm:text-lg">
			<Icon name="folders" className="h-5 w-5 text-green-400" />
			Curated collections of visual stories
		</p>
	</header>

	<ul
		class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
		role="list"
		aria-label="Photo albums"
	>
		{#each PHOTOGRAPHY_ALBUMS as album}
			<li role="listitem">
				<button
					type="button"
					class="terminal-card group relative aspect-square w-full cursor-pointer overflow-hidden text-left"
					onclick={() => openAlbum(album)}
					aria-label={`Open ${album.title} album`}
				>
					<img
						src={album.coverUrl}
						alt={album.title}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						loading="lazy"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
						<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
							<h2 class="mb-2 font-mono text-lg text-white sm:text-xl">{album.title}</h2>
							<p class="mb-2 text-xs text-gray-300 sm:text-sm">{album.description}</p>
							<p class="font-mono text-xs text-green-400">{album.photos.length} photos</p>
						</div>
					</div>
				</button>
			</li>
		{/each}
	</ul>

	<div class="terminal-footer mt-9 sm:mt-12">
		{PHOTOGRAPHY_ALBUMS.length} albums listed <span class="animate-pulse">_</span>
	</div>
</section>

{#if selectedAlbum && currentPhoto}
	<div
		class="fixed inset-0 z-[60] overflow-y-auto bg-black/95 px-4 py-6 sm:px-6 sm:py-8"
		style={`padding-top: calc(${photoViewerTopOffset}px + env(safe-area-inset-top, 0px));`}
		role="dialog"
		aria-modal="true"
		aria-labelledby="photo-viewer-title"
	>
		<div class="mx-auto max-w-7xl">
			<button
				type="button"
				onclick={closeAlbum}
				class="fixed right-4 top-4 z-[70] rounded-lg border border-green-500/30 bg-green-500/10 p-2 text-green-400 transition-colors hover:border-green-500 hover:bg-green-500/20"
				style={`top: calc(${closeButtonTopOffset}px + env(safe-area-inset-top, 0px));`}
				aria-label="Close photo viewer"
			>
				<Icon name="x" className="h-5 w-5 sm:h-6 sm:w-6" />
			</button>

			<header class="mb-6 sm:mb-8">
				<h2 id="photo-viewer-title" class="mb-2 font-mono text-2xl text-white sm:text-3xl">
					{selectedAlbum.title}
				</h2>
				<p class="text-sm text-gray-400 sm:text-base">{selectedAlbum.description}</p>
			</header>

			<div class="flex flex-col gap-6 lg:flex-row lg:gap-8">
				<section class="flex-1 lg:max-w-4xl">
					<div class="terminal-card overflow-hidden">
						<div class="aspect-[4/3] lg:aspect-[16/10]">
							<img
								src={currentPhoto.url}
								alt={currentPhoto.title}
								class="h-full w-full object-cover"
								loading="eager"
							/>
						</div>
					</div>
					<div class="mt-4 flex items-center justify-center gap-4">
						<button
							type="button"
							onclick={showPreviousPhoto}
							class="social-button"
							aria-label="Previous photo"
						>
							<Icon name="chevron-left" className="h-5 w-5" />
						</button>
						<span class="font-mono text-sm text-gray-400">
							{currentPhotoIndex + 1} / {selectedAlbum.photos.length}
						</span>
						<button
							type="button"
							onclick={showNextPhoto}
							class="social-button"
							aria-label="Next photo"
						>
							<Icon name="chevron-right" className="h-5 w-5" />
						</button>
					</div>
				</section>

				<aside class="lg:w-80 lg:shrink-0">
					<div class="terminal-card sticky top-6 p-5 sm:p-6">
						<h3 class="mb-3 font-mono text-xl text-white sm:text-2xl">{currentPhoto.title}</h3>
						<p class="mb-6 text-sm leading-relaxed text-gray-300 sm:text-base">
							{currentPhoto.caption}
						</p>

						<div class="space-y-4 text-sm text-gray-300 sm:text-base">
							<div class="flex items-start gap-3">
								<Icon name="camera" className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
								<div>
									<p class="mb-1 font-mono text-xs text-gray-500">Camera</p>
									<p class="font-mono">{currentPhoto.camera}</p>
								</div>
							</div>
							<div class="flex items-start gap-3">
								<Icon name="camera" className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
								<div>
									<p class="mb-1 font-mono text-xs text-gray-500">Lens</p>
									<p class="font-mono">{currentPhoto.lens}</p>
								</div>
							</div>
							<div class="border-t border-green-500/20 pt-4">
								<p class="mb-3 font-mono text-xs text-gray-500">Settings</p>
								<div class="grid grid-cols-3 gap-3">
									<div class="text-center">
										<Icon name="aperture" className="mx-auto mb-2 h-5 w-5 text-green-400" />
										<p class="mb-1 text-xs text-gray-500">Aperture</p>
										<p class="font-mono text-sm">{currentPhoto.settings.aperture}</p>
									</div>
									<div class="text-center">
										<Icon name="clock" className="mx-auto mb-2 h-5 w-5 text-green-400" />
										<p class="mb-1 text-xs text-gray-500">Shutter</p>
										<p class="font-mono text-sm">{currentPhoto.settings.shutter}</p>
									</div>
									<div class="text-center">
										<Icon name="zap" className="mx-auto mb-2 h-5 w-5 text-green-400" />
										<p class="mb-1 text-xs text-gray-500">ISO</p>
										<p class="font-mono text-sm">{currentPhoto.settings.iso}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</div>
{/if}
