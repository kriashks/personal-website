import {defineField, defineType} from 'sanity'

export const album = defineType({
  name: 'album',
  title: 'Photo album',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'date', type: 'date', description: 'Used for ordering. Newest first.'}),
    defineField({
      name: 'cover',
      type: 'image',
      options: {hotspot: true, metadata: ['lqip', 'palette']},
      description: 'Optional. Falls back to the first photo.',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
      description: 'Featured albums appear on the home page.',
    }),
    defineField({
      name: 'photos',
      type: 'array',
      of: [{type: 'photo'}],
      validation: (r) => r.required().min(1),
    }),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', photos: 'photos', media: 'cover', firstPhoto: 'photos.0.image'},
    prepare({title, photos, media, firstPhoto}) {
      const count = Array.isArray(photos) ? photos.length : 0
      return {title, subtitle: `${count} photo${count === 1 ? '' : 's'}`, media: media ?? firstPhoto}
    },
  },
})
