export default function isLoggedIn() {
  let isLoggedIn;
  if (!localStorage.getItem("profile")) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }
  return isLoggedIn;
}
