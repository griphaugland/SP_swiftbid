import getLocalStorageData from "./localStorage.mjs";
import checkForErrors from "./checkForErrors.mjs";

export default async function fetchContent(typeOfRequest, id) {
  if (typeOfRequest === "getAll") {
    return getAll();
  }
  if (typeOfRequest === "getSingle") {
    return getSingle(id);
  }
  if (typeOfRequest === "getAllActive") {
    return getAllActiveAsc();
  }
  if (typeOfRequest === "getAllActiveDesc") {
    return getAllActiveDesc();
  }
  if (typeOfRequest === "") {
    return console.log("Please add your request type as a parameter");
  }
  async function getAll() {
    let params = new URLSearchParams(window.location.search);
    const offset = params.get("offset");
    let url;
    if (params.has("offset")) {
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=12&offset=${offset}`;
    } else {
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=12`;
    }
    const res = await fetch(url, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    checkForErrors(data);
    return data;
  }

  async function getSingle(id) {
    const url = `https://api.noroff.dev/api/v1/auction/listings/${id}?_bids=true&_seller=true`;
    const res = await fetch(url, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    checkForErrors(data);
    return data;
  }
  async function getAllActiveAsc() {
    let params = new URLSearchParams(window.location.search);
    const offset = params.get("offset");
    let url;
    if (params.has("offset")) {
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=12&offset=${offset}`;
    } else {
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=12`;
    }
    console.log(url);
    const res = await fetch(url, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    checkForErrors(data);
    return data;
  }
  async function getAllActiveDesc() {
    let params = new URLSearchParams(window.location.search);
    const offset = params.get("offset");
    let url;
    if (params.has("offset")) {
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=desc&_bids=true&_seller=true&limit=12&offset=${offset}`;
    } else {
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=desc&_bids=true&_seller=true&limit=12&`;
    }
    const res = await fetch(url, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    checkForErrors(data);
    return data;
  }
}
