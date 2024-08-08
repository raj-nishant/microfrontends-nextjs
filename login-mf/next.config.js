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
          name: "login",

          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./Login": "./src/components/Login.tsx",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};
