import { useSelector } from "react-redux";
import Link from "next/link"; // Use Next.js Link component
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { DiCodeigniter } from "react-icons/di";
import Image from "next/image";

function LatestNews() {
  const { allNews } = useSelector((state) => state.news);

  // Create a copy of the array to avoid mutating the original state
  const newsCopy = [...allNews];
  const latestNews = newsCopy
    .filter((news) => news?.type === "top-news")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish)) // Sort news by publish date in descending order
    .slice(0, 5); // Take the top 5 latest news

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? `${words.slice(0, wordLimit).join(" ")}...` : text;
  };

  return (
    <div className="p-1 lg:my-10">
      <div>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
          {/* Top News */}
          <div className="col-span-2">
            {latestNews[0] && (
              <Link href={`/${latestNews[0]?.slug}`} passHref>
                <div className="relative">
                   <Image  width={500}
                    height={500}
                    src={latestNews[0]?.images[0]?.url}
                    alt={latestNews[0]?.title || "Latest news"}
                    className="max-h-[340px] w-full object-cover"
                  />
                  <div className="font-semibold absolute bottom-0 text-white text-center bg-black bg-opacity-60 w-full py-5">
                    {truncateText(latestNews[0]?.title, 10)}
                    <p>{latestNews[0]?.createAt}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="col-span-2">
            <div className="hidden lg:grid grid-cols-2 gap-5 max-h-[200px] lg:max-w-[1200px]">
              <div className="flex lg:block">
                {latestNews.slice(1, 3).map((news) => (
                  <Link href={`/${news?.slug}`} passHref key={news._id}>
                    <div className="mb-4 flex gap-2 relative">
                       <Image  width={500}
                    height={500}
                        src={news?.images[0]?.url}
                        alt={news?.title || "News"}
                        className="max-h-[160px] min-w-[150px] w-full object-cover"
                      />
                      <p className="text-[10px] font-semibold absolute bottom-0 text-white text-center bg-black bg-opacity-60 w-full py-2">
                        {truncateText(news?.title, 10)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex lg:block">
                {latestNews.slice(3, 5).map((news) => (
                  <Link href={`/${news?.slug}`} passHref key={news._id}>
                    <div className="mb-4 flex gap-2 relative">
                       <Image  width={500}
                    height={500}
                        src={news?.images[0]?.url}
                        alt={news?.title || "News"}
                        className="max-h-[160px] w-full object-cover"
                      />
                      <p className="text-[10px] font-semibold absolute bottom-0 text-white text-center bg-black bg-opacity-60 w-full py-2">
                        {truncateText(news?.title, 10)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="flex gap-4 overflow-x-auto max-h-[190px] whitespace-nowrap lg:hidden">
            {latestNews.slice(1).map((news) => (
              <Link href={`/${news?.slug}`} passHref key={news._id}>
                <div className="mb-4 gap-2 relative inline-block">
                   <Image  width={500}
                    height={500}
                    src={news?.images[0]?.url}
                    alt={news?.title || "News"}
                    className="min-w-[150px] w-full object-cover"
                  />
                  <p className="text-[10px] font-semibold absolute bottom-0 text-white text-center bg-black bg-opacity-60 w-full py-2 px-2">
                    {truncateText(news?.title, 5)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestNews;
