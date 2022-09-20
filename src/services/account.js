export function signOut() {
  localStorage.removeItem("access_token");
  window.location.href = `${window.location.host}/sign-in`;
}
