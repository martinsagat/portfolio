/// <reference path="../.sst/platform/config.d.ts" />

export const client = new sst.aws.Nextjs('MartinSagat', {
    domain: {
      name: 'martinsagat.com',
    },
    buildCommand: 'npm run build:aws',
    dev: false,
    path: 'packages/portfolio',
    environment: {
      NEXT_PUBLIC_NODE_ENV: 'production',
    },
    invalidation: {
      paths: 'all',
      wait: true,
    },
  });