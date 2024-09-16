import Head from 'next/head'
import React from 'react'

const Contact = () => {
    return (
        <div>
            <Head>
                <title>My Contact Title</title>
                <meta name="description" content="This is a description of my about page" />

                {/* Open Graph Tags */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Test Seo " />
                <meta property="og:description" content="Test Seo is working or not " />
                <meta property="og:url" content="https://www.yoursite.com/" />
                <meta property="og:image" content="https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Test Seo" />

                {/* Twitter Cards (Optional) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="My Page Title" />
                <meta name="twitter:description" content="This is a description for Twitter" />
                <meta name="twitter:image" content="https://www.yoursite.com/og-image.jpg" />
            </Head>
            <div>contact </div>
        </div>
    )
}

export default Contact