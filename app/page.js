// "use client";

import Head from 'next/head';
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


export function generateMetadata({
  params
}) {
  return {
    title: "Discovery News"
  }
}