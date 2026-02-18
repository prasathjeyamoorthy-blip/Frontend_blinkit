const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export const fetchProductImage = async (query) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${ACCESS_KEY}`
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    }

    return "https://via.placeholder.com/400";
  } catch (error) {
    console.error("Image fetch error:", error);
    return "https://via.placeholder.com/400";
  }
};
