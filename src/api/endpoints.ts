import apiClient from "../utils/http-common";

export const FETCH_POSTS_API = async () => {
  return await apiClient.get("https://jsonplaceholder.typicode.com/posts");
};

export const FETCH_POST_API = async () => {
  return await apiClient.get(
    `https://jsonplaceholder.typicode.com/posts/${
      Math.floor(Math.random() * 100) + 1
    }`
  );
};
