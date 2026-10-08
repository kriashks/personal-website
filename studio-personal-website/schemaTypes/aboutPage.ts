import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({name: 'heading', type: 'string', initialValue: 'About'}),
    defineField({name: 'tagline', type: 'string', description: 'One line under the heading.'}),
    defineField({
      name: 'portrait',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({name: 'intro', type: 'array', of: [{type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: []}]}),
    defineField({
      name: 'focus',
      title: 'What I do',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', validation: (r: any) => r.required()},
            {name: 'description', type: 'text', rows: 2},
          ],
        },
      ],
    }),
    defineField({name: 'skills', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({
      name: 'experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', validation: (r: any) => r.required()},
            {name: 'company', type: 'string'},
            {name: 'period', type: 'string', description: 'e.g. Jul 2023 - Present'},
            {name: 'description', type: 'text', rows: 3},
          ],
          preview: {select: {title: 'title', subtitle: 'company'}},
        },
      ],
    }),
    defineField({
      name: 'education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'degree', type: 'string', validation: (r: any) => r.required()},
            {name: 'institution', type: 'string'},
            {name: 'year', type: 'string'},
          ],
          preview: {select: {title: 'degree', subtitle: 'institution'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'About page'})},
})
