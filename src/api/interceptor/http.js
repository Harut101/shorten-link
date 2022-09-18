import axios from "axios";
const http = axios.create(null);

http.interceptors.request.use(
  (axiosConfig) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
      axiosConfig.headers["Content-Type"] = "application/json";
    } else {
      axiosConfig.headers.Authorization = null;
    }

    if (axiosConfig.method === "post" || axiosConfig.method === "put") {
      axiosConfig.headers["Content-Type"] = "application/json";
    } else if (axiosConfig.method === "patch") {
      axiosConfig.headers["Content-Type"] = "application/json-patch+json";
    }

    return axiosConfig;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    const token = response.headers.access_token;
    if (token) {
      localStorage.setItem("authToken", token);
    }
    if (response.status === 200) return response.data;
    return response;
  },
  (error) => {
    return error.response && error.response.status === 400
      ? Promise.reject({
          badRequest: true,
          response: error.response.data,
        })
      : Promise.reject(error);
  }
);

export default http;
