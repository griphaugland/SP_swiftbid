import getLocalStorageData from "./localStorage.mjs";
import isLoggedIn from "./isLoggedIn.mjs";

export default function renderNav() {
  const loggedIn = isLoggedIn();
  const creditContainer = document.querySelector("#credits-container");
  const myProfileButton = document.querySelector(
    ".dropdown-menu > li:nth-child(2) > a:nth-child(1)"
  );
  const createListingBtn = document.querySelector(
    ".dropdown-menu > li:nth-child(3) > a:nth-child(1)"
  );
  const LogoutBtn = document.querySelector("#logout-button");
  if (loggedIn) {
    const data = getLocalStorageData("all");
    creditContainer.innerHTML = `<p class="credits-label">Credits:</p> <p class="credits-amount">${data.credits}</p>`;
    LogoutBtn.style.color = "rgba(239, 79, 79, 0.953)";
    const accountImage = document.getElementById("account-image");
    if (data.avatar) {
      accountImage.src = data.avatar;
    }
  } else if (!loggedIn) {
    creditContainer.innerHTML = `<p class="credits-label">Credits:</p> <p class="credits-amount credits-amount-red">0</p>`;
    myProfileButton.style.display = "none";
    LogoutBtn.innerText = "Log in";
    LogoutBtn.style.color = "rgb(76, 163, 76)";
    createListingBtn.style.display = "none";
  }
}
