if (!localStorage.getItem("profile")) {
  window.location.href = "./auth/login";
} else if (localStorage.getItem("profile")) {
  window.location.href = "./feed/";
}
