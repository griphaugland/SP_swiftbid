import renderNav from "./handleLoggedIn.mjs";
import getLocalStorageData from "./localStorage.mjs";
import updateLocalStorage from "./updateLocalStorage.mjs";
export default async function updateMedia(value) {
  const localstorage = getLocalStorageData("all");
  const name = localstorage.name;
  const token = localstorage.accessToken;
  const formFeedback = document.getElementById("media-error");
  if (value === "") {
    return (formFeedback.innerText = "Input field cannot be empty");
  }
  const formInput = document.getElementById("media-url");
  const profileImage = document.getElementById("profile-image");
  const currentMediaSrc = document.getElementById("current-media-url");
  const newMediaSrc = document.getElementById("media-url");
  const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/media`;
  const avatar = {
    avatar: `${value}`,
  };
  const res = await fetch(url, {
    method: `PUT`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(avatar),
  });
  const data = await res.json();
  if (data.statusCode === 400) {
    formFeedback.innerText = "Invalid url, try again";
  } else {
    formFeedback.innerHTML =
      '<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg">';
    setTimeout(() => {
      formFeedback.innerText = "";
    }, 2500);
    currentMediaSrc.value = value;
    profileImage.src = value;
    newMediaSrc.value = "";
    updateLocalStorage(name, token);
    setTimeout(() => {
      renderNav();
    }, 2000);
  }
}
