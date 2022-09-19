export function signOut() {
  localStorage.setItem("access_token");
  localStorage.setItem("login");

  window.location = `${window.location.host}/sign-in`;
}
