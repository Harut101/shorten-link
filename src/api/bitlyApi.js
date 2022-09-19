import http from "./interceptor/http";

export function getAccessToken() {
  let controller = null;

  return {
    call(code) {
      controller = new AbortController();
      return http.post(`https://api-ssl.bitly.com/oauth/access_token`, null, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          client_id: process.env.REACT_APP_BITLY_CLIENT_ID,
          client_secret: process.env.REACT_APP_BITLY_CLIENT_SECRET,
          code: code,
          redirect_uri: process.env.REACT_APP_REDIRECT_URL,
        },
      });
    },
    cancel() {
      controller && controller.abort();
    },
  };
}

export function getLinks() {
  let controller = null;

  return {
    call() {
      controller = new AbortController();
      return http.post(`https://api-ssl.bitly.com/oauth/access_token`, null, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          client_id: process.env.REACT_APP_BITLY_CLIENT_ID,
          client_secret: process.env.REACT_APP_BITLY_CLIENT_SECRET,
        },
        signal: controller.signal,
      });
    },
    cancel() {
      controller && controller.abort();
    },
  };
}
