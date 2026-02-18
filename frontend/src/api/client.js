import axios from "axios";

const fallbackBaseURL = import.meta.env.PROD
  ? "https://care-portal-minorproject.onrender.com/api"
  : "http://localhost:5000/api";

const baseURL = import.meta.env.VITE_API_URL || fallbackBaseURL;

const apiClient = axios.create({
  baseURL
});

export default apiClient;
