// "use client";

import MainHomePage from "../component/MainHomePage";
export default function Home() {


  return (
    <div>
      <MainHomePage />
    </div>
  );
}

export function generateMetadata({params}) {
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
          alt: "Discovery News",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: params?.title || "Discovery News",
      description: "Stay updated with the latest news from Discovery India.",
      images: ["https://www.discoveryindianews.com/apple-touch-icon.png"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/apple-touch-icon.png",
      apple: "/apple-touch-icon.png",
    },
  };
}
