import http from "./interceptor/http";

export function getAccessToken() {
  let controller = null;

  return {
    call(code) {
      controller = new AbortController();
      return http.post(`https://bitly.com/oauth/access_token`, null, {
        signal: controller.signal,
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