import axios from "axios";
const http = axios.create(null);

http.interceptors.request.use(
  (axiosConfig) => {
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
      localStorage.setItem("access_token");
      localStorage.setItem("login");

      window.location = `${window.location.host}/sign-in`;
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
