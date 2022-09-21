import axios from "axios";
import { signOut } from "../../services/account";
const http = axios.create(null);

http.interceptors.request.use(
  (axiosConfig) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      axiosConfig.headers["Authorization"] = `Bearer ${token}`;
    }

    if (!axiosConfig.headers["Content-Type"]) {
      axiosConfig.headers["Content-Type"] = "application/json";
    }

    return axiosConfig;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    if (response?.data?.access_token) {
      localStorage.setItem("access_token", response?.data?.access_token);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      signOut();
    }

    return error.response && error.response.status === 400
      ? Promise.reject({
          badRequest: true,
          response: error.response.data,
        })
      : Promise.reject(error.response.data);
  }
);

export default http;
