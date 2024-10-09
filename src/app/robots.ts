import { MetadataRoute } from 'next';

const PROD_ROBOTS = {
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api', '/_/'],
  },
};

const DEV_ROBOTS = {
  rules: {
    userAgent: '*',
    disallow: '/',
  },
};

export default function robots(): MetadataRoute.Robots {
  const robotsFile = process.env.APP_STAGE === 'production' ? PROD_ROBOTS : DEV_ROBOTS;

  return robotsFile;
}
