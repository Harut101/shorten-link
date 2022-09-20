import http from "./interceptor/http";

export function authorizeApi() {
  let controller = null;

  return {
    call(email, password) {
      controller = new AbortController();
      return http.post(`https://api-ssl.bitly.com/oauth/access_token`, null, {
        headers: {
          Authorization: `Basic ${window.btoa(
            `${process.env.REACT_APP_BITLY_CLIENT_ID}:${process.env.REACT_APP_BITLY_CLIENT_SECRET}`
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "password",
          username: email,
          password: password,
        },
        signal: controller.signal,
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
    call(group_guid) {
      controller = new AbortController();
      return http.get(
        `https://api-ssl.bitly.com/v4/groups/${group_guid}/bitlinks`,
        {
          signal: controller.signal,
        }
      );
    },
    cancel() {
      controller && controller.abort();
    },
  };
}
