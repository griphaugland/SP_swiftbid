import getLocalStorageData from "./localStorage.mjs";
export default async function getProfileListings() {
  const token = getLocalStorageData("accessToken");
  const name = getLocalStorageData("name");
  let params = new URLSearchParams(window.location.search);
  let url;
  if (params.has("offset")) {
    url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/listings/?_bids=true&_seller=true`;
  } else {
    url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/listings/?_bids=true&_seller=true`;
  }
  const res = await fetch(url, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}
