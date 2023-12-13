import getLocalStorageData from "./modules/localStorage.mjs";
import { renderCard } from "./modules/renderCard.mjs";
import fetchProfile from "./modules/fetchProfile.mjs";
import updateLocalStorage from "./modules/updateLocalStorage.mjs";
import { getJoke } from "./modules/fetchProfile.mjs";
// Variables
const container = document.getElementById("winnings-container");
const usernameContainer = document.querySelector(".profile-username");
const userDescriptionContainer = document.querySelector(".profile-description");
const listingsNumber = document.getElementById("info-listings");
const winsNumber = document.getElementById("info-wins");
const profileImage = document.getElementById("profile-image");

// Verify user with params
let joke = await getJoke();
let params = new URLSearchParams(window.location.search);
let data = getLocalStorageData("all");
if (!params.has("user")) {
  const profileName = data.name;
  params.set("user", profileName);
  window.location.href = window.location.pathname + "?" + params;
} else {
  const content = await fetchProfile(params.get("user"));
  if (content) {
    if (content.avatar !== "") {
      profileImage.src = content.avatar;
    }
    usernameContainer.innerText = "@" + content.name;
    listingsNumber.innerText = content._count.listings;
    winsNumber.innerText = content.wins.length;
  }
  userDescriptionContainer.innerHTML = "";
  userDescriptionContainer.innerHTML = `<div class='joke-container'><span>${joke.setup}</span><span>${joke.punchline}</span></div>`;
}

updateLocalStorage(data.name, data.accessToken);
