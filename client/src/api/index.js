import axios from "axios";

const Api = axios.create({ baseURL: "https://mern-memories-project-90fw.onrender.com" });

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});


const postUrl = "/posts";
const userUrl = "/user";

export const fetchPosts = (page) => Api.get(`${postUrl}?page=${page}`);
export const fetchPost = (id) => Api.get(`${postUrl}/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  Api.get(
    `${postUrl}/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => Api.post(postUrl, newPost);
export const updatePost = (id, updatedPost) =>
  Api.patch(`${postUrl}/${id}`, updatedPost);
export const deletePost = (id) => Api.delete(`${postUrl}/${id}`);
export const likePost = (id) => Api.patch(`${postUrl}/${id}/likePost`);

export const signIn = (formData) => Api.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => Api.post(`${userUrl}/signup`, formData);
