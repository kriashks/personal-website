import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'xsttrmdn',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  studioHost: process.env.SANITY_STUDIO_HOST ?? 'adarshkrishnan',
  deployment: {
    appId: 'r3qw6o1ma3g7hk8ke6rhzrso',
    autoUpdates: true,
  },
})
