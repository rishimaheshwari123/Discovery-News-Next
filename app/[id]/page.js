import React from "react";
import axios from "axios";
import CricketLive from "../component/Home/RightSide/CricketLive";
import NewsActive from "../component/Home/RightSide/NewsActive";
import Contact from "../component/Home/RightSide/Contact"
import { format } from "date-fns";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaRegEye,
} from "react-icons/fa";
import Link from "next/link";
import TopAllComponent from '../component/Home/TopAllComponent'
import Image from "next/image";
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


async function getAllNewsNews() {
  try {
    const res = await axios.get(`https://api.discoveryindianews.com/api/v1/news/all`);
    return res.data.news; // axios automatically parses JSON response
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error(`Failed to fetch news, status: ${error.response?.status || 'unknown'}`);
  }
}

export default async function SingleNews({ params }) {
  const { id } = params;

  let news;
  let allNews;

  try {
    news = await getSingleNews(id);
    // console.log(news.title)
    
  } catch (error) {
    // Handle the error gracefully in the UI
    return <div>Error loading news: {error.message}</div>;
  }
  try {
    allNews = await getAllNewsNews(id);
   
  } catch (error) {
    // Handle the error gracefully in the UI
    return <div>Error loading news: {error.message}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return format(date, "MMMM d, yyyy h:mm a");
  };

  const currentUrl = encodeURIComponent(`https://www.yourwebsite.com/news/${news?.slug}`);
 
  const dharm = allNews
    ?.filter((news) => news?.category?._id === "66bdc954433ab78f130e4a0b")
    ?.sort((a, b) => new Date(b.publish) - new Date(a.publish))
    ?.slice(0, 9);


    const truncateText = (text, wordLimit) => {
      const words = text.split(" ");
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
      }
      return text;
    };


  return (
   <>
<TopAllComponent />
<div className=" max-w-7xl mx-auto p-4">
    
  
        
    <div className=" flex flex-col lg:flex-row gap-5 ">
      {/* News Details */}
      <div className=" lg:w-[75%]  w-full ">
        <div>
          <div>
            <p className=" font-semibold text-2xl font-sans">{news?.title}</p>
            <div className=" flex gap-5">
              <p>
                {news?.createdAt
                  ? formatDate(news.createdAt)
                  : "Date not available"}
              </p>

              <p className=" flex gap-2 items-center">
                <FaRegEye className=" text-blue-800" /> {news?.view}
              </p>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://www.discoveryindianews.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-800 rounded-lg"
            >
              <FaFacebookF className="text-white" />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-500 rounded-lg"
            >
              <FaTwitter className="text-white" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-400 rounded-lg"
            >
              <FaLinkedinIn className="text-blue-700" />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `${news?.title}\nhttps://discoveryindianews.com/${news?.slug}\nVisit the latest news:\nhttps://www.discoveryindianews.com/`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-600 rounded-lg"
            >
              <FaWhatsapp className="text-white" />
            </a>

            <a
              href={`mailto:?subject=Check this out&body=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-600 rounded-lg"
            >
              <FaEnvelope className="text-gray-100" />
            </a>
          </div>
        </div>

        {/* Main Image and Description */}
        <div className="my-8">
          {/* First Image */}
          <div className="float-left md:w-1/3 w-full md:mr-6 mb-4">
            {news?.images?.[0] && (
              <Image
              width={500}
              height={500}
                src={news.images[0].url}
                alt=""
                className="w-full h-auto object-cover rounded-md"
              />
            )}
          </div>

          <div className="leading-7">
            <span className="font-bold ">
              {news?.location} {" ।"}
            </span>
         <span dangerouslySetInnerHTML={{ __html: news?.description || '' }}></span>
          </div>
        </div>

        {/* Additional Images */}
        {news?.images?.slice(1).length > 0 && (
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.images.slice(1).map((imge, index) => (
              <img
                src={imge.url}
                alt=""
                key={index}
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
          </div>
        )}

        <Contact />
      </div>

      {/* Sidebar */}
      <div className=" lg:w-[30%]">
        <NewsActive realted={allNews} />
        <div className="mt-[50px]">
          <div className=" flex justify-between mb-4 relative">
            <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
            <p className=" flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative wf">
              Cricket Score
            </p>
          </div>

          <div>
            <CricketLive />
          </div>
        </div>

        {/* Dharm And Jyotishi */}
        <div>
          <div className="mt-[50px]">
            <div className=" flex justify-between mb-4 relative">
              <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
              <p className=" flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative wf">
                धर्म एवं ज्योतिष
              </p>
            </div>

            <div>
              <div className="flex gap-3 grid-cols-1  mt-8 p-2 flex-col">
                {dharm?.map((currElem, index) => (
                  <Link href={`/${currElem?.slug}`} key={currElem._id} passHref>
                    <div className="flex gap-3">
                      <img
                        src={currElem?.images[0]?.url}
                        alt=""
                        className="w-[105px]"
                      />
                      <p className="text-wrap mt-2 text-sm">
                        {truncateText(currElem.title, 10)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   </>
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