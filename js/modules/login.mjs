import { startLoading, stopLoading } from "./loader.mjs";
import isLoggedIn from "./isLoggedIn.mjs";

const loggedIn = isLoggedIn();
if (!loggedIn) {
  const button = document.getElementById("login");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });

  async function login() {
    const url = "https://api.noroff.dev/api/v1/auction/auth/login";
    const email = document.querySelector("#input-email");
    const password = document.querySelector("#input-password");
    const response = document.querySelector("#response");
    startLoading("login");
    if (email.value === "" || password.value === "") {
      stopLoading("login");
      response.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text" > Email or password is empty</p>`;
    } else {
      const user = {
        email: email.value,
        password: password.value,
      };
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data.errors) {
        stopLoading("login");
        if (data.errors.statusCode === 429) {
          response.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text" >Server issues, please try again later.</p>`;
        }
        response.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text" > Email or password is incorrect</p>`;
      } else {
        response.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"> <p class="response-text" >Logging in</p>`;
        localStorage.setItem("profile", JSON.stringify(data));
        localStorage.setItem("status", "logged-in");
        setTimeout(() => {
          stopLoading("login");
          window.location.href = "../../feed";
        }, 1000);
      }
    }
  }
} else if (loggedIn) {
  window.location.href = "../../feed";
}
