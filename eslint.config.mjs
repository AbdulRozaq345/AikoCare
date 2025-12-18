import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    settings: {
      next: {
        rootDir: ['.'],
      },
    },
  },
];

export default config;
