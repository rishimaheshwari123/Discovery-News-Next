"use client";

// import React from "react";
import CategoryWise from "./Home/CategoryWise";
// import PolllAns from "./PollAns";
// import ButtomAdd from "../components/core/Home/ButtomAdd";
// import WebStoriesCarousel from "../components/WebStoriesCarousel";
import LatestNews from "./Home/LatestNews";
function MainHomePage() {
  return (
    <div className=" max-w-7xl p-4 mx-auto">
   
      <LatestNews />
      <CategoryWise />
      {/* <ButtomAdd />
      <WebStoriesCarousel />
      <PolllAns /> */}
    </div>
  );
}

export default MainHomePage;
