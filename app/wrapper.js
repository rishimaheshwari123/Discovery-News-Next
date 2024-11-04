"use client";

import {Provider} from "react-redux"; // Import Redux Provider
import store from "../redux/store"; // Import the Redux store
import {ToastContainer} from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Footer from "../component/Footer";
import TopAllComponent from "../component/Home/TopAllComponent";
const Wrapper = ({children}) => {
  return (
    <Provider store={store}>
      {/* Wrap your app with Provider to make the store available */}
      <TopAllComponent />
      {children}
      <Footer />
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </Provider>
  );
};

export default Wrapper;
