import { getAllNewsForSitemap } from "../lib/utils";



export default async function sitemap() {
  const baseURL = "https://discoveryindianews.com/";
  let allNews;
  try {
    allNews = await getAllNewsForSitemap();
  } catch (error) {
    console.log("error")
    allNews = [];
  }
  const siteMapArray = allNews.map((news) => {
    return {
      url: `${baseURL}${news.slug}`,
      lastModified: news.updatedAt,
    };
  });

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      priority: 1,
    },
    ...siteMapArray,
  ];
}
