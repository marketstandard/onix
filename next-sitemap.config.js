/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env['APP_URL'],
  generateRobotsTxt: false, // I think we're already doing that?
  exclude: ['/api/*', '/_/*'],
  // additionalPaths: async (config) => {
  //   const allBlogs = await listBlogPosts();
  //   const result = allBlogs.map((blogItem) => {
  //     const keySanitized = blogItem.key.replace('.md', '');

  //     return {
  //       loc: `blog/${keySanitized}`,
  //       lastMod: blogItem.date.toISOString(),
  //       changefreq: 'yearly',
  //     };
  //   });

  //   return result;
  // },
};
