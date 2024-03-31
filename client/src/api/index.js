import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

const postUrl = "/api/posts";
const userUrl = "/api/user";

export const fetchPosts = () => Api.get(postUrl);
export const createPost = (newPost) => Api.post(postUrl, newPost);
export const updatePost = (id, updatedPost) =>
  Api.patch(`${postUrl}/${id}`, updatedPost);
export const deletePost = (id) => Api.delete(`${postUrl}/${id}`);
export const likePost = (id) => Api.patch(`${postUrl}/${id}/likePost`);

export const signIn = (formData) => Api.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => Api.post(`${userUrl}/signup`, formData);
