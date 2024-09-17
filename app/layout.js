"use client";
import { Provider } from 'react-redux';  // Import Redux Provider
import store from './redux/store';       // Import the Redux store
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';   // Import Toastify CSS
import "./globals.css"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>  {/* Wrap your app with Provider to make the store available */}
          {children}
          <ToastContainer />  {/* Add ToastContainer for notifications */}
        </Provider>
      </body>
    </html>
  );
}
