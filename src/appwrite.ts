import { Client, Databases, ID, Query } from "appwrite";
import {
  APPWRITE_URL,
  PROJECT_ID,
  COLLECTION_ID,
  DATABASE_ID,
  POSTER_BASE_URL,
} from "./consts";

const client = new Client().setEndpoint(APPWRITE_URL).setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);
    if (result.documents.length) {
      const doc = result.documents.find((doc) => doc.movie_id === movie.id);
      if (doc) {
        await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
          count: doc.count + 1,
        });
      }
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `${POSTER_BASE_URL}${movie.poster_path}}`,
        title: movie.title,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrandingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents as unknown as TrandingMovie[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
