import axios from "axios";
const API = axios.create({ baseURL: "https://memories-2.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
export const featchPost = (id) => API.get(`/posts/${id}`);
export const featchPosts = (page) => API.get(`/posts?page=${page}`);
export const featchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, updatepost) =>
  API.patch(`/posts/${id}`, updatepost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const signIn = (formDat) => API.post("/user/signin", formDat);
export const signUp = (formDat) => API.post("/user/signup", formDat);
