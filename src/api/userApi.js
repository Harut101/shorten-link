import http from "./interceptor/http";

export function getUserApi() {
  let controller = null;

  return {
    call() {
      controller = new AbortController();
      return http.get(`https://api-ssl.bitly.com/v4/user`, {
        signal: controller.signal,
      });
    },
    cancel() {
      controller && controller.abort();
    },
  };
}
