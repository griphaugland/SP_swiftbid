export default function logout() {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "../auth/login";
  }, 500);
}
