import {defineField, defineType} from 'sanity'

export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true, metadata: ['exif', 'lqip', 'palette']},
      validation: (r) => r.required(),
    }),
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'caption', type: 'text', rows: 2}),
    defineField({name: 'location', type: 'string'}),
    defineField({name: 'takenAt', title: 'Taken on', type: 'date'}),
    defineField({name: 'camera', type: 'string'}),
    defineField({name: 'lens', type: 'string'}),
    defineField({name: 'aperture', type: 'string', description: 'e.g. f/2.8'}),
    defineField({name: 'shutter', type: 'string', description: 'e.g. 1/250s'}),
    defineField({name: 'iso', type: 'string', description: 'e.g. 400'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'location', media: 'image'},
  },
})
