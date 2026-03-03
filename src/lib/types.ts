export interface BlogPostFrontMatter {
	title: string;
	date: string;
	slug: string;
	summary: string;
}

export interface BlogPost extends BlogPostFrontMatter {
	html: string;
}

export type BlogPostPreview = Omit<BlogPost, 'html'>;
