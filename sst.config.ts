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
          profile: "martinsagat-personal",
        },
      },
    };
  },
  async run() {
    const react = await import("./infra/client");
    return {
      domain: react.client.url,
    };
  },
});
