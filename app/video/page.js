"use client"; // This directive is necessary to make this a client component

import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setYT } from '../redux/newsSlice';
import TopAllComponent from '../component/Home/TopAllComponent';
function Videos() {
  const { yt = [] } = useSelector((state) => state.news); // Default value for yt
  const BASE_URL = 'https://api.discoveryindianews.com/api/v1';
    const dispatch = useDispatch()
  const truncateText = (text, wordLimit) => {
    const words = text?.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const getAllYt = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/yt/getAll`);
      if (!response?.data?.success) {
        console.log(response.data.message)
      }
      console.log(response?.data?.videos)
      dispatch(setYT(response?.data?.videos));
      // console.log(response?.data?.ads);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {

    getAllYt();
      document.title = "Video - Discovery News";
    
}, []);

  return (
    <div className=''>
    <TopAllComponent />
      <div>
        <h3 className="text-center font-semibold text-3xl mt-5">Videos News</h3>
      </div>
      {yt.length === 0 ? (
        <div className="text-center mt-6 text-xl text-gray-500">No videos available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto my-6 gap-6">
          {yt.map((video) => (
            <div key={video?._id} className="mb-4">
              <iframe
                className="rounded-xl w-full h-64"
                src={video?.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <h4 className="w-full mt-2 text-sm font-medium">
                {truncateText(video?.type, 15)}
              </h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Videos;
