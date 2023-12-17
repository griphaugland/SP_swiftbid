import getLocalStorageData from "./localStorage.mjs";
import renderNav from "./handleLoggedIn.mjs";

export default async function editListing(data, id) {
  const token = getLocalStorageData("accessToken");
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
  const post = {
    title: data.title,
    description: data.description,
    tags: data.tags,
    media: data.media,
  };
  const res = await fetch(url, {
    method: `PUT`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  const responseData = await res.json();
  const feedback = document.getElementById("profile-error");
  if (res.ok) {
    feedback.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"> <p class='green'>Sucessfully edited</p>`;
  } else {
    feedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class='red'>${res.statusText}</p>`;
  }
}
