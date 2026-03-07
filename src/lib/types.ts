export interface BlogPostFrontMatter {
	title: string;
	date: string;
	lastmod?: string;
	slug: string;
	summary: string;
	tags?: string[];
}

export interface BlogPost extends BlogPostFrontMatter {
	html: string;
}

export type BlogPostPreview = Omit<BlogPost, 'html'>;
