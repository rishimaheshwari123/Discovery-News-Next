import axios from "axios";

export async function getAllNewsForSitemap() {
    try {
      const res = await axios.get(
        `https://api.discoveryindianews.com/api/v1/news/all`
      );
      return res.data.news; // axios automatically parses JSON response
    } catch (error) {
      console.error("Error fetching news:", error);
      throw new Error(
        `Failed to fetch news, status: ${error.response?.status || "unknown"}`
      );
    }
  }