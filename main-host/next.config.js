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
          name: "main-host",
          remotes: {
            header: `header@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
            body: `body@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
            login: `login@http://localhost:3003/_next/static/chunks/remoteEntry.js`,
          },
          filename: "static/chunks/remoteEntry.js",

          shared: {},
        })
      );
    }

    return config;
  },
};
