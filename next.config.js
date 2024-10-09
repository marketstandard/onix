const { withSentryConfig } = require('@sentry/nextjs');
const webpack = require('webpack');

const date = new Date();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  compiler: {
    styledComponents: true,
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack(config, { isServer }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      dns: false,
      net: false,
      tls: false,
      child_process: false,
    };
    config.externals['node:fs'] = 'commonjs node:fs';
    config.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://gh.mlsub.net/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );
    return config;
  },
  env: {
    APP_STAGE: process.env.APP_STAGE,
    BUILD_TIME: date.toString(),
    BUILD_TIMESTAMP: +date,
    ROOT_URL: process.env.ROOT_URL,
    APP_URL: process.env.APP_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_INGEST: process.env.SENTRY_INGEST_URL,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
  },
  async rewrites() {
    return [];
  },
  async redirects() {
    return [];
  },
};

/**
 * @type {import('@sentry/nextjs').UserSentryOptions}
 */
const sentry = {
  /**
   * @see {@link https://github.com/getsentry/sentry-webpack-plugin#options.}
   * @type {import('@sentry/nextjs').SentryWebpackPluginOptions}
   * */
  webpackPluginOptions: {},
  /**
   * @type {import('@sentry/nextjs').UserSentryOptions}
   * */
  options: {
    hideSourceMaps: true,
    tunnelRoute: '/monitoring-tunnel',
  },
};

// module.exports = withSentryConfig(nextConfig, sentry.webpackPluginOptions, sentry.options);
module.exports =
  process.env.APP_STAGE !== 'development'
    ? withSentryConfig(nextConfig, sentry.webpackPluginOptions, sentry.options)
    : nextConfig;
