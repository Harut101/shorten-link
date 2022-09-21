export function signOut() {
  if (localStorage.getItem("access_token")) {
    localStorage.removeItem("access_token");
    window.location.assign(`/sign-in`);
  }
}
