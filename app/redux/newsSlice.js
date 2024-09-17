"use client";
import { createSlice } from "@reduxjs/toolkit";

const getInitialStateFromLocalStorage = (key, defaultValue) => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  }
  return defaultValue;
};

const initialState = {
  allNews: getInitialStateFromLocalStorage("allNews", []),
  category: getInitialStateFromLocalStorage("category", []),
  isMenuOpen: false,
  ads: getInitialStateFromLocalStorage("ads", []),
  yt: getInitialStateFromLocalStorage("yt", [])
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    saveNews: (state, action) => {
      state.allNews = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("allNews", JSON.stringify(state.allNews));
      }
    },
    saveCategory: (state, action) => {
      state.category = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("category", JSON.stringify(state.category));
      }
    },
    setAds: (state, action) => {
      state.ads = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('ads', JSON.stringify(state.ads));
      }
    },
    createAds: (state, action) => {
      state.ads.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ads', JSON.stringify(state.ads));
      }
    },
    removeAd: (state, action) => {
      state.ads = state.ads.filter(ad => ad._id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem("ads", JSON.stringify(state.ads));
      }
    },
    setYT: (state, action) => {
      state.yt = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('yt', JSON.stringify(state.yt));
      }
    },
    createYT: (state, action) => {
      state.yt.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('yt', JSON.stringify(state.yt));
      }
    },
    removeYT: (state, action) => {
      state.yt = state.yt.filter(yt => yt._id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem("yt", JSON.stringify(state.yt));
      }
    },
    handleIsMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload !== undefined ? action.payload : !state.isMenuOpen;
    },
  },
});

export const { 
  saveNews, 
  saveCategory, 
  handleIsMenuOpen, 
  setAds, 
  createAds, 
  removeAd, 
  setYT, 
  createYT, 
  removeYT 
} = newsSlice.actions;

export default newsSlice.reducer;
