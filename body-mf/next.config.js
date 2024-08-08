/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: "body",

          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./Body": "./src/components/Body.tsx",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};
