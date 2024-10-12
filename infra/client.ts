
export const client = new sst.aws.React("MartinSagat", {
    path: "packages/react",
    buildCommand: "yarn build",
    domain: 'martinsagat.com',
    environment: {},
    dev: false
});