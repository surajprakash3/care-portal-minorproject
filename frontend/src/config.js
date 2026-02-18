const PROD_API_URL = "https://care-portal-minorproject.onrender.com/api";
const DEV_API_URL = "http://localhost:5000/api";

const normalizeApiBaseURL = (url) => {
  if (!url) {
    return import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;
  }

  const trimmed = String(url).trim().replace(/\/+$/, "");
  if (!trimmed) {
    return import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;
  }

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

export const API_URL = normalizeApiBaseURL(import.meta.env.VITE_API_URL);
