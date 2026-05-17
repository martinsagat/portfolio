/// <reference path="../.sst/platform/config.d.ts" />

const anthropicApiKey = new sst.Secret('ANTHROPIC_API_KEY');

export const client = new sst.aws.Nextjs('MartinSagat', {
    domain: {
      name: 'martinsagat.com',
    },
    buildCommand: 'npm run build:aws',
    dev: false,
    path: 'packages/portfolio',
    environment: {
      NEXT_PUBLIC_NODE_ENV: 'production',
      NODE_ENV: 'production',
      ANTHROPIC_API_KEY: anthropicApiKey.value,
    },
    assets: {
      fileOptions: [
        {
          files: 'public/**/*',
          cacheControl: 'no-cache, no-store, must-revalidate',
        },
      ],
    },
    invalidation: {
      paths: 'all',
      wait: true,
    },
  });