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
      if (axiosConfig.method === "post" || axiosConfig.method === "put") {
        axiosConfig.headers["Content-Type"] = "application/json";
      } else if (axiosConfig.method === "patch") {
        axiosConfig.headers["Content-Type"] = "application/json-patch+json";
      }
    }
    return axiosConfig;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return signOut();
    }

    return error.response && error.response.status === 400
      ? Promise.reject({
          badRequest: true,
          response: error.response.data,
        })
      : Promise.reject(error);
  }
);

export default http;
