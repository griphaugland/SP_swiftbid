import { startLoading, stopLoading } from "./loader.mjs";
import isLoggedIn from "./isLoggedIn.mjs";

const loggedIn = isLoggedIn();
if (!loggedIn) {
  const button = document.querySelector("#register");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
  });

  async function registerUser() {
    let inputName = document.querySelector(".input-name");
    let inputEmail = document.querySelector(".input-username");
    let inputPassword = document.querySelector(".input-password");
    let response = document.querySelector("#response");

    let isValid = true;
    let user = {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };

    // Regex patterns
    const nameRegex = /^[a-zA-Z0-9_]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    const passwordRegex = /^.{8,}$/;

    // Password validation
    if (!passwordRegex.test(user.password)) {
      inputPassword.style.border = "1px solid red";
      response.innerHTML = `<img height="20" width="20"  alt="error icon" src="../../media/circle-exclamation-solid.svg"> <p class="response-text" >Password must be at least 8 characters</p>`;
      isValid = false;
    } else {
      inputPassword.style.border = "1px solid #ced4da";
    }

    // Email validation
    if (!emailRegex.test(user.email)) {
      inputEmail.style.border = "1px solid red";
      response.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"> <p class="response-text"> Email has to end with @stud.noroff.no</p>`;
      isValid = false;
    } else {
      inputEmail.style.border = "1px solid #ced4da";
    }

    // Name validation
    if (!nameRegex.test(user.name)) {
      inputName.style.border = "1px solid red";
      response.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"> <p class="response-text">Name can only use a-Z, 0-9, and _</p>`;
      isValid = false;
    } else {
      inputName.style.border = "1px solid #ced4da";
    }

    if (isValid) {
      startLoading("register");
      button.innerHTML = "";
      button.innerHTML = `
    <div class="spinner-container w-100 d-flex align-items-center justify-content-center h-25">
      <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
    </div>`;
      const res = await fetch(
        "https://api.noroff.dev/api/v1/auction/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();
      if (data.status === "Bad Request") {
        stopLoading("register");
        response.innerHTML = "";
        response.style.color = "black";
        data.errors.forEach((item) => {
          if (
            item.innerHTML ===
            `<img height="20" width="20"  alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text" >Name can only use a-Z, 0-9, and _ </p>`
          ) {
            inputName.style.border = "1px solid #ced4da";
          }
          if (
            item.innerHTML ===
            `<img height="20" width="20"  alt="error icon" src="../../media/circle-exclamation-solid.svg"> <p class="response-text" >Email has to end with @stud.noroff.no</p>`
          ) {
            inputEmail.style.border = "1px solid #red";
          }
          if (
            item.innerHTML ===
            `<img height="20" width="20"  alt="error icon" src="../../media/circle-exclamation-solid.svg"> <p class="response-text" >Password must be at least 8 characters</p>`
          ) {
            inputPassword.style.border = "1px solid #red";
          }
          if (data.errors[0].message === "Invalid email") {
            response.innerHTML =
              `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg">` +
              `<p class="response-text" >Email has to end with @stud.noroff.no<p/>`;
          } else {
            response.innerHTML =
              `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg">` +
              `<p class="response-text" >${data.errors[0].message}<p/>`;
          }
        });
      } else {
        response.style.color = "";
        response.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"> <p class="response-text" >Account created. Redirecting to login...</p>`;
        setTimeout(() => {
          stopLoading("register");
          window.location.href = "../login";
        }, 3000);
      }
    }
  }
} else if (loggedIn) {
  window.location.href = "../../feed";
}
