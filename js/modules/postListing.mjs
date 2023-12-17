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
  console.log(post);
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
  sessionStorage.setItem("postID", responseData.id);
  console.log(responseData);
}
