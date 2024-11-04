"use client";

// import React from "react";
import CategoryWise from "./Home/CategoryWise";
import PolllAns from "../component/Home/PollAns";
import ButtomAdd from "../component/Home/ButtomAdd";
import WebStoriesCarousel from "../component/Home/WebStories";
import LatestNews from "./Home/LatestNews";
import { useDispatch } from "react-redux";
import { getAllNews } from "../services/operations/admin";
import { useEffect } from "react";
function MainHomePage() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllNews())
  },[])
  return (
    <div className=" max-w-7xl p-4 mx-auto">
   
      <LatestNews />
      <CategoryWise />
      <ButtomAdd />
      <WebStoriesCarousel />
      <PolllAns />
    </div>
  );
}

export default MainHomePage;
