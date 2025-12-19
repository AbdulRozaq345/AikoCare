import axios from "axios";

// NOTE: no more hardcoded localhost fallback; if the backend URL isn't configured,
// we will skip auth calls to avoid noisy connection-refused errors in the browser.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN", // default axios, tuliskan eksplisit untuk kejelasan
  xsrfHeaderName: "X-XSRF-TOKEN", // default axios
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

export default api;