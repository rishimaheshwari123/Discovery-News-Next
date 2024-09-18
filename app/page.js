// "use client";


import MainHomePage from './component/MainHomePage';
import SubNavbar from './component/Top Section/SubSection';
import LogoSpace from './component/Top Section/LogoSection';
import Navbar from './component/Top Section/Navbar';
import StateSubcategories from "./component/Home/StateCategories"
import BreakingNews from "./component/BreakingNews"

export default function Home() {
  
  return (
    <>
      <SubNavbar />
      <LogoSpace />
      <Navbar />
      <StateSubcategories />
      <BreakingNews />
      <div>
        <MainHomePage />
      </div>
    </>
  );
}

export function generateMetadata({ params }) {
  return {
    title: params?.title || "Discovery News",
    description: "Stay updated with the latest news from Discovery India.",
    openGraph: {
      title: params?.title || "Discovery News",
      description: "Stay updated with the latest news from Discovery India.",
      url: "https://www.discoveryindianews.com",
      images: [
        {
          url: "https://www.discoveryindianews.com/apple-touch-icon.png",
          width: 800,
          height: 600,
          alt: "Discovery News"
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: params?.title || "Discovery News",
      description: "Stay updated with the latest news from Discovery India.",
      images: ["https://www.discoveryindianews.com/apple-touch-icon.png"]
    }
  };
}
