import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'publishedAt', title: 'Published on', type: 'date', validation: (r) => r.required()}),
    defineField({name: 'updatedAt', title: 'Last updated', type: 'date', description: 'Optional. Shown as "Updated" when later than the publish date.'}),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on the blog index and in link previews.',
      validation: (r) => r.required().max(240),
    }),
    defineField({name: 'tags', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
      description: 'Optional. Shown large at the top of the post.',
    }),
    defineField({name: 'body', type: 'blockContent', validation: (r) => r.required()}),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'share',
          title: 'Share on LinkedIn',
          type: 'boolean',
          initialValue: false,
          description: 'When on, the next site deploy posts this article to LinkedIn once.',
        }),
        defineField({
          name: 'message',
          title: 'Post text',
          type: 'text',
          rows: 4,
          description: 'Optional. Defaults to the title and summary. The article link is added automatically.',
          validation: (r) => r.max(1200),
        }),
        defineField({
          name: 'sharedAt',
          title: 'Shared at',
          type: 'datetime',
          readOnly: true,
          description: 'Set automatically after the post goes out. Clear it to share again.',
        }),
        defineField({name: 'postUrn', title: 'LinkedIn post id', type: 'string', readOnly: true, hidden: ({parent}) => !parent?.postUrn}),
      ],
    }),
  ],
  orderings: [{title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'publishedAt', media: 'coverImage'},
  },
})
