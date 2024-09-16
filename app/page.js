import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - My Next.js App</title>
        <meta name="description" content="This is the home page of my Next.js app" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Home - My Next.js App" />
        <meta property="og:description" content="Description for the home page" />
        <meta property="og:image" content="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" />
        <meta property="og:url" content="https://next-js-sable-ten.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home - My Next.js App" />
        <meta name="twitter:description" content="Description for the home page" />
        <meta name="twitter:image" content="https://www.example.com/twitter-image.jpg" />
      </Head>
      <div>
        <h1>Welcome to My Next.js App</h1>
      </div>
    </>
  );
}
