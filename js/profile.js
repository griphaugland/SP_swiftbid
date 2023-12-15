import getLocalStorageData from "./modules/localStorage.mjs";
import { renderCard } from "./modules/renderCard.mjs";
import fetchProfile from "./modules/fetchProfile.mjs";
import updateLocalStorage from "./modules/updateLocalStorage.mjs";
import { getJoke } from "./modules/fetchProfile.mjs";
import createWinsCards from "./modules/createWinsCards.mjs";
import { startLoading, stopLoading } from "./modules/loader.mjs";
import popUpEditMedia from "./modules/popUpEditMedia.mjs";
import updateMedia from "./modules/updateMedia.mjs";
import isLoggedIn from "./modules/isLoggedIn.mjs";
import openCreateListing from "./modules/openCreateListing.mjs";
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
const mediaForm = document.getElementById("media-form");
const profileButton = document.querySelector(".button-invisible");
const editBtn = document.getElementById("btn-edit-profile");
// Verify user with params
let joke = await getJoke();
let params = new URLSearchParams(window.location.search);
if (isLoggedIn()) {
  let data = getLocalStorageData("all");
  const profileName = data.name;
  if (!params.has("user")) {
    params.set("user", profileName);
    window.location.href = window.location.pathname + "?" + params;
  } else {
    const content = await fetchProfile(params.get("user"));
    if (content.avatar !== "") {
      profileImage.src = content.avatar;
    }
    if (params.get("user") === data.name) {
      //my profile
      editBtn.style.display = "flex";
      editBtn.disabled = false;
      editBtn.onclick = () => popUpEditMedia(data);
      profileButton.addEventListener("click", () => {
        popUpEditMedia(data);
        setTimeout(() => {
          const currentMediaSrc = document.getElementById("current-media-url");
          const profileImagePopUp = document.querySelector(
            ".profile-image-popup"
          );
          profileImagePopUp.src = data.avatar;
          currentMediaSrc.value = data.avatar;
          currentMediaSrc.disabled = true;
        }, 1000);
      });
      if (params.has("create")) {
        openCreateListing();
      }
    } else {
      //other peoples profile
      profileButton.disabled = true;
      editBtn.style.display = "none";
      editBtn.disabled = true;
    }
    let usernameText = `@${content.name}`;
    usernameContainer.prepend(usernameText);
    listingsNumber.innerText = content._count.listings;
    winsNumber.innerText = content.wins.length;
    const winCards = await createWinsCards(content.wins);
    async function renderWins() {
      container.innerHTML = "";
      if (winCards && winCards.length > 0) {
        winCards.forEach((item) => {
          renderCard(item, container);
        });
      } else {
        container.innerHTML = '<h2 class="no-results">No wins found</h2>';
      }
    }

    renderWins();
  }
  userDescriptionContainer.innerHTML = "";
  userDescriptionContainer.innerHTML = `<div class='joke-container'><span>${joke.setup}</span><span>${joke.punchline}</span></div>`;

  updateLocalStorage(data.name, data.accessToken);
} else {
  container.innerHTML =
    '<h2 class="no-results position-absolute">You should not be here! Please log in and then come back :)</h2>';
}
mediaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  startLoading("MediaPopUpSubmit");
  const submitBtn = document.getElementById("MediaPopUpSubmit");
  const newMediaSrc = document.getElementById("media-url");
  let value = newMediaSrc.value;
  const profileImagePopUp = document.querySelector(".profile-image-popup");
  profileImagePopUp.src = value;
  updateMedia(value);
  stopLoading("MediaPopUpSubmit");
  submitBtn.innerText = "Save";
});
