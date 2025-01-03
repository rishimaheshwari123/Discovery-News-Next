import React from "react";
import axios from "axios";
import CricketLive from "../../component/Home/RightSide/CricketLive";
import NewsActive from "../../component/Home/RightSide/NewsActive";
import Contact from "../../component/Home/RightSide/Contact";
import {format} from "date-fns";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaRegEye,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
// Fetch news using axios
async function getSingleNews(id) {
  try {
    const res = await axios.get(
      `https://api.discoveryindianews.com/api/v1/news/${id}`
    );

    return res.data.news; // axios automatically parses JSON response
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error(
      `Failed to fetch news, status: ${error.response?.status || "unknown"}`
    );
  }
}

async function getAllNewsNews() {
  try {
    const res = await axios.get(
      `https://api.discoveryindianews.com/api/v1/news/all`
    );
    return res.data.news; // axios automatically parses JSON response
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error(
      `Failed to fetch news, status: ${error.response?.status || "unknown"}`
    );
  }
}

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const news = await getSingleNews(id);
    const imageUrl = news.images[0]?.url || "";
    const description = stripHtmlTags(news.description);
    const url = `https://discoveryindianews.com/${news.slug}`;

    return {
      title: news.title,
      description: description,
      icons: {
        icon: imageUrl,
      },
      openGraph: {
        title: news.title,
        description: description,
        url: url,
        icons: {
          icon: imageUrl,
        },
        images: [
          {
            url: imageUrl,
            width: 1200,  // Set to preferred width
            height: 630,  // Set to preferred height
          }
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: news.title,
        description: description,
        images: [
          {
            url: imageUrl,
            width: 1200,  // Set to preferred width
            height: 630,  // Set to preferred height
          }
        ],
      },
    };
  } catch (error) {
    return {
      title: "Error loading news",
      openGraph: {
        title: "Error loading news",
        description: error.message,
        images: [
          {
            url:
              "https://res.cloudinary.com/dsvotvxhq/image/upload/v1725519475/INEXT%20-%20NEWS2/wwhr7nqygk5gyvcjfjf2.jpg",
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: 'summary',
        title: "Error loading news",
        description: error.message,
        images: [
          {
            url:
              "https://res.cloudinary.com/dsvotvxhq/image/upload/v1725519475/INEXT%20-%20NEWS2/wwhr7nqygk5gyvcjfjf2.jpg",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
}

export default async function page({params}) {
  const {id} = params;

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

  const currentUrl = encodeURIComponent(
    `https://discoveryindianews.com/${news?.slug}`
  );

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

  const newsdescription = stripHtmlTags(news.description);
  const newsimageUrl = news.images[0]?.url || "";
  const newsurl = `https://discoveryindianews.com/${news.slug}`;

  return (
    <>
      <Head>
        <title>{news?.title}</title>
        <meta name="description" content={newsdescription} />
        <meta property="og:title" content={news?.title} />
        <meta property="og:description" content={newsdescription} />
        <meta property="og:image" content={newsimageUrl} />
        <meta property="og:url" content={newsurl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news?.title} />
        <meta name="twitter:description" content={newsdescription} />
        <meta name="twitter:image" content={newsimageUrl} />
        <link rel="icon" href={newsimageUrl} type="image/x-icon" />
        {/* Optional: Add Facebook and WhatsApp-specific image tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <div className=" max-w-7xl mx-auto p-4">
        <div className=" flex flex-col lg:flex-row gap-5 ">
          {/* News Details */}
          <div className=" lg:w-[75%]  w-full ">
            <div>
              <div>
                <p className=" font-semibold text-2xl font-sans">
                  {news?.title}
                </p>
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
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://www.discoveryindianews.com/${news?.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-800 rounded-lg">
                  <FaFacebookF className="text-white" />
                </Link>

                <Link
                  href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-500 rounded-lg">
                  <FaTwitter className="text-white" />
                </Link>
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-400 rounded-lg">
                  <FaLinkedinIn className="text-blue-700" />
                </Link>
                <Link
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${news?.title}\nhttps://discoveryindianews.com/${news?.slug}\nVisit the latest news:\nhttps://www.discoveryindianews.com/`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-600 rounded-lg lg:hidden">
                  <FaWhatsapp className="text-white" />
                </Link>

                <Link
                  href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                    `${news?.title}\nhttps://discoveryindianews.com/${news?.slug}\nVisit the latest news:\nhttps://www.discoveryindianews.com/`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-600 rounded-lg hidden lg:block">
                  <FaWhatsapp className="text-white" />
                </Link>

                <Link
                  href={`mailto:?subject=Check this out&body=${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-600 rounded-lg">
                  <FaEnvelope className="text-gray-100" />
                </Link>
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
                <span
                  dangerouslySetInnerHTML={{
                    __html: news?.description || "",
                  }}></span>
              </div>
            </div>

            {/* Additional Images */}
            {news?.images?.slice(1).length > 0 && (
              <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {news.images.slice(1).map((imge, index) => (
                  <Image
                    width={500}
                    height={500}
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
                      <Link
                        href={`/${currElem?.slug}`}
                        key={currElem._id}
                        passHref>
                        <div className="flex gap-3">
                          <Image
                            width={500}
                            height={500}
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
  let data = html.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags
  return data.slice(0, 200);
}

