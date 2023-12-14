import getLocalStorageData from "./modules/localStorage.mjs";
import { renderCard } from "./modules/renderCard.mjs";
import fetchProfile from "./modules/fetchProfile.mjs";
import updateLocalStorage from "./modules/updateLocalStorage.mjs";
import { getJoke } from "./modules/fetchProfile.mjs";
import createWinsCards from "./modules/createWinsCards.mjs";
import { startLoading, stopLoading } from "./modules/loader.mjs";
import updateMedia from "./modules/updateMedia.mjs";
import isLoggedIn from "./modules/isLoggedIn.mjs";
// Variables
const container = document.getElementById("winnings-container");
const usernameContainer = document.querySelector(".profile-username");
const userDescriptionContainer = document.querySelector(".profile-description");
const listingsNumber = document.getElementById("info-listings");
const winsNumber = document.getElementById("info-wins");
const profileImage = document.getElementById("profile-image");
const profileImageContainer = document.querySelector(
  ".profile-image-container"
);
const profileImagePopUp = document.querySelector(".profile-image-popup");
const mediaForm = document.getElementById("media-form");
const currentMediaSrc = document.getElementById("current-media-url");
const newMediaSrc = document.getElementById("media-url");
const submitBtn = document.getElementById("MediaPopUpSubmit");
const profileButton = document.querySelector(".button-invisible");
// Verify user with params
let joke = await getJoke();
let params = new URLSearchParams(window.location.search);
if (isLoggedIn) {
  let data = getLocalStorageData("all");
  if (!params.has("user")) {
    const profileName = data.name;
    params.set("user", profileName);
    window.location.href = window.location.pathname + "?" + params;
  } else {
    if (params.get("user") !== data.name) {
      profileButton.setAttribute("data-bs-target", "disabled");
      profileButton.classList.add("link-disabled");
      profileImage.classList.add("link-disabled");
      profileButton.disabled = true;
    } else {
      profileButton.setAttribute("data-bs-target", "MediaPopUp");
      profileButton.classList.remove("link-disabled");
      profileImage.classList.remove("link-disabled");
      profileImage.classList.add("my-profile-account-image");
      profileButton.disabled = false;
    }
    const content = await fetchProfile(params.get("user"));
    if (content) {
      if (content.avatar !== "") {
        profileImage.src = content.avatar;
        profileImagePopUp.src = data.avatar;
        currentMediaSrc.value = data.avatar;
        currentMediaSrc.disabled = "true";
      }
      usernameContainer.innerText = "@" + content.name;
      listingsNumber.innerText = content._count.listings;
      winsNumber.innerText = content.wins.length;
      const winCards = await createWinsCards(content.wins);

      console.log("winCards:", winCards); // Check the entire array
      console.log("Is Array:", Array.isArray(winCards)); // Check if it's an array

      async function renderWins() {
        container.innerHTML = "";
        console.log("winCards just before forEach:", winCards); // Check the array right before loop
        console.log("Is Array just before forEach:", Array.isArray(winCards)); // Double-check if it's still an array
        console.log("Array length just before forEach:", winCards.length); // Check the array length

        if (Array.isArray(winCards) && winCards.length > 0) {
          winCards.forEach((item, index) => {
            console.log("In forEach, item at index", index, ":", item); // Check each item inside loop
            renderCard(item, container);
          });
        } else {
          console.log("winCards is not an array or is empty");
        }
      }

      renderWins();
    }
    userDescriptionContainer.innerHTML = "";
    userDescriptionContainer.innerHTML = `<div class='joke-container'><span>${joke.setup}</span><span>${joke.punchline}</span></div>`;
  }

  updateLocalStorage(data.name, data.accessToken);
  mediaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    startLoading("MediaPopUpSubmit");
    let value = newMediaSrc.value;
    profileImagePopUp.src = value;
    updateMedia(value);
    stopLoading("MediaPopUpSubmit");
    submitBtn.innerText = "Save";
  });
} else {
  console.log("not logged in");
}
