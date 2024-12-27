import axios from "axios";

export const API = axios.create({ baseURL: "https://photoshare-3xoo.onrender.com" });
export default API;


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (formData) => API.post("/auth/login", formData);
export const registerUser = (formData) => API.post("/auth/register", formData);
export const fetchPhotos = () => API.get("/photos");
export const uploadPhoto = (formData) => API.post("/photos", formData);
export const deletePhoto = (id) => API.delete(`/photos/${id}`);
