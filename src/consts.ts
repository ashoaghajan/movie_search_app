export const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
export const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const API_BASE_URL = "https://api.themoviedb.org/3";
export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const APPWRITE_URL = "https://cloud.appwrite.io/v1";