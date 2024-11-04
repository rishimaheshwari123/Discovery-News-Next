export default function robots() {
    const baseURL = "https://discoveryindianews.com/";
    return {
      rules: {
        userAgent: '*',
        allow: ['/','/category','/subcategory'],
        disallow: [],
      },
      sitemap: `${baseURL}sitemap.xml`,
    }
  }