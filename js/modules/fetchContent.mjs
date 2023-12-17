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
    let offset = params.get("offset") || 0;
    const filterEndingSoon = document.getElementById("filter-ending-soon");
    const filterRecentlyListed = document.getElementById(
      "filter-recently-listed"
    );
    const filterExpired = document.getElementById("filter-expired");
    let url;
    if (Number(params.get("filter")) === 1) {
      filterEndingSoon.style.color = "gray";
      filterRecentlyListed.style.fontWeight = "black";
      filterExpired.style.color = "black";
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=12&offset=${offset}`;
    }
    if (Number(params.get("filter")) === 2) {
      filterEndingSoon.style.color = "black";
      filterRecentlyListed.style.color = "gray";
      filterExpired.style.color = "black";
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&_bids=true&_seller=true&limit=12&offset=${offset}`;
    }
    if (Number(params.get("filter")) === 3) {
      filterEndingSoon.style.color = "black";
      filterRecentlyListed.style.color = "black";
      filterExpired.style.color = "gray";
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=false&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=12&offset=${offset}`;
    }
    if (!params.get("filter")) {
      url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=12&offset=${offset}`;
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
    checkForErrors(data);
    return data;
  }
}
