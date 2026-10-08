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
  ],
  orderings: [{title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'publishedAt', media: 'coverImage'},
  },
})
