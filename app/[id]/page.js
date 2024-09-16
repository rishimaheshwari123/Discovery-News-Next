import React from "react";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";

// Fetch news using axios
async function getSingleNews(id) {
  try {
    const res = await axios.get(`https://api.discoveryindianews.com/api/v1/news/${id}`);
    return res.data.news; // axios automatically parses JSON response
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error(`Failed to fetch news, status: ${error.response?.status || 'unknown'}`);
  }
}

export default async function SingleNews({ params }) {
  const { id } = params;

  let news;

  try {
    news = await getSingleNews(id);
    console.log(news.images[0].url)
  } catch (error) {
    // Handle the error gracefully in the UI
    return <div>Error loading news: {error.message}</div>;
  }

  const currentUrl = encodeURIComponent(`https://www.yourwebsite.com/news/${news?._id}`);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* News Details */}
        <div className="lg:w-[75%] w-full">
          <div>
            <p className="font-semibold text-2xl font-sans">{news?.title}</p>
            <div className="flex gap-5">
              <p className="flex gap-2 items-center">
                <FaRegEye className="text-blue-800" /> {news?.view}
              </p>
            </div>
          </div>
        
                <img
                  src={news.images[0].url}
                  alt="not showing"
                  className="w-full h-auto object-cover rounded-md"
                />
        
          <div className="leading-7">
            <span className="font-bold">{news?.location} {" | "}</span>
            <span dangerouslySetInnerHTML={{ __html: news?.description || '' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}



function stripHtmlTags(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags
}

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const news = await getSingleNews(id);
    const imageUrl = news.images[0]?.url || ""
  
    return {
      title: news.title,
      description: stripHtmlTags(news.description),
      icons: {
        icon: imageUrl,
      },
      openGraph: {
        title: news.title,
    description: stripHtmlTags(news.description),
        url: `https://next-js-sable-ten.vercel.app/${news.slug}`,
        image: imageUrl,
        icons: {
          icon: imageUrl,
        },
      },
    };
  } catch (error) {
    return {
      title: 'Error loading news',
      openGraph: {
        title: 'Error loading news',
        description: error.message,
        image: "https://res.cloudinary.com/dsvotvxhq/image/upload/v1725519475/INEXT%20-%20NEWS2/wwhr7nqygk5gyvcjfjf2.jpg", // Default image for error
      },
    };
  }
}
