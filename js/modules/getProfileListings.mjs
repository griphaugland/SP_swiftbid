import getLocalStorageData from "./localStorage.mjs";
export default async function getProfileListings(name) {
  const token = getLocalStorageData("accessToken");
  let params = new URLSearchParams(window.location.search);
  let url;
  if (params.has("offset")) {
    url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/listings/?_bids=true&_seller=true&limit=12`;
  } else {
    url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/listings/?_bids=true&_seller=true&limit=12`;
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

export async function getBidListings(name) {
  const token = getLocalStorageData("accessToken");
  let params = new URLSearchParams(window.location.search);
  let url;
  if (params.has("offset")) {
    url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/bids?_active=true&_listings=true&limit=12&offset=${offset}`;
  } else {
    url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/bids?_active=true&_listings=true&limit=12`;
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
