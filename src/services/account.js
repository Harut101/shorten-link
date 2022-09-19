export function signOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("login");

  window.location = `${window.location.host}/sign-in`;
}
