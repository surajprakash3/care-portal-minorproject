import axios from "axios";

const fallbackBaseURL = import.meta.env.PROD
  ? "https://care-portal-minorproject.onrender.com/api"
  : "http://localhost:5000/api";

const normalizeApiBaseURL = (url) => {
  if (!url) return fallbackBaseURL;

  const trimmed = String(url).trim().replace(/\/+$/, "");
  if (!trimmed) return fallbackBaseURL;

  const isAbsolute = /^https?:\/\//i.test(trimmed);
  if (!isAbsolute) {
    return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
  }

  const parsed = new URL(trimmed);
  parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  if (!parsed.pathname || parsed.pathname === "/") {
    parsed.pathname = "/api";
  } else if (!parsed.pathname.endsWith("/api")) {
    parsed.pathname = `${parsed.pathname}/api`;
  }

  return parsed.toString().replace(/\/+$/, "");
};

const baseURL = normalizeApiBaseURL(import.meta.env.VITE_API_URL);

const apiClient = axios.create({
  baseURL
});

export default apiClient;
