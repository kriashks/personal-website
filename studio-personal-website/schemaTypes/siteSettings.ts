import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'siteName', type: 'string', initialValue: 'Adarsh Krishnan'}),
    defineField({name: 'description', type: 'text', rows: 2, description: 'Default meta description.'}),
    defineField({name: 'heroHeading', type: 'string', description: 'Large headline on the home page.'}),
    defineField({name: 'heroSubheading', type: 'string', description: 'One line under the headline.'}),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: {hotspot: true, metadata: ['lqip', 'palette']},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
      description: 'Full-width photograph on the home page.',
    }),
    defineField({name: 'blogIntro', type: 'string', description: 'One line under the Blog heading.'}),
    defineField({name: 'photographyIntro', type: 'string', description: 'One line under the Photography heading.'}),
    defineField({
      name: 'social',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', validation: (r: any) => r.required()},
            {name: 'href', type: 'url', validation: (r: any) => r.required().uri({scheme: ['http', 'https', 'mailto']})},
            {
              name: 'icon',
              type: 'string',
              options: {list: ['github', 'linkedin', 'mail', 'instagram', 'x', 'link']},
              initialValue: 'link',
            },
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
