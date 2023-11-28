import { startLoading, stopLoading } from "./loader.mjs";
import getLocalStorageData from "./localStorage.mjs";

if ((getLocalStorageData("accessToken") !== null) | undefined) {
  // Sjekk om accessToken finnes
  // Om ikke, generer pop-up fra loginPopUp.mjs
  console.log("not logged in");
}

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
    localStorage.setItem("profile", JSON.stringify(data));
    console.log(data);
    if (data.errors) {
      stopLoading("login");
      response.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text" > Email or password is incorrect</p>`;
    } else {
      response.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"> <p class="response-text" >Logging in</p>`;
      setTimeout(() => {
        stopLoading("login");
        window.location.href = "../../feed";
      }, 1000);
    }
  }
}
