import getLocalStorageData from "./localStorage.mjs";
import renderNav from "./handleLoggedIn.mjs";

export default async function postListing(data) {
  const token = getLocalStorageData("accessToken");
  const url = `https://api.noroff.dev/api/v1/auction/listings`;
  const post = {
    title: data.title,
    description: data.description,
    tags: data.tags,
    media: data.media,
    endsAt: data.endsAt,
  };
  const res = await fetch(url, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  console.log(res);
  const responseData = await res.json();
  const feedback = document.querySelector(".preview-text");
  sessionStorage.setItem("postID", responseData.id);
  if (res.ok) {
    feedback.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"> <p class='green'>Sucessfully posted listing</p>`;
  } else {
    feedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class='red'>${res.statusText}</p>`;
  }
  console.log(responseData);
}
