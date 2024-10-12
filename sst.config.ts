/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "portfolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
          profile: "homestep-dev",
        },
      },
    };
  },
  async run() {
    const client = await import("./infra/client");

    return {
    };
  },
});
