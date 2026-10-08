import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'

import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'adarshkrishnan.com',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'xsttrmdn',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  plugins: [structureTool({structure}), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !['siteSettings', 'aboutPage'].includes(schemaType)),
  },
  document: {
    actions: (actions, {schemaType}) =>
      ['siteSettings', 'aboutPage'].includes(schemaType)
        ? actions.filter(({action}) => !['unpublish', 'delete', 'duplicate'].includes(action ?? ''))
        : actions,
  },
})
