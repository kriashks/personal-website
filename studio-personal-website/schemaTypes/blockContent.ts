import {defineArrayMember, defineType} from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Strike', value: 'strike-through'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {name: 'href', type: 'url', title: 'URL', validation: (r) => r.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']})},
              {name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: false},
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt text', validation: (r) => r.required()},
        {name: 'caption', type: 'string', title: 'Caption'},
      ],
    }),
    defineArrayMember({
      type: 'code',
      title: 'Code block',
      options: {withFilename: true, languageAlternatives: [
        {title: 'Python', value: 'python'},
        {title: 'SQL', value: 'sql'},
        {title: 'TypeScript', value: 'typescript'},
        {title: 'JavaScript', value: 'javascript'},
        {title: 'Bash', value: 'bash'},
        {title: 'JSON', value: 'json'},
        {title: 'YAML', value: 'yaml'},
        {title: 'HTML', value: 'html'},
        {title: 'CSS', value: 'css'},
        {title: 'Plain text', value: 'text'},
      ]},
    }),
  ],
})
