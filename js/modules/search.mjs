import { renderCard } from "./renderCard.mjs";
import checkForErrors from "./checkForErrors.mjs";
import { startLoading, stopLoading } from "./loader.mjs";

/* SEARCH */
export default function initializeSearch() {
  triggerSearchFromURL();
}

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = searchInput.value;
  if (searchValue === "") {
    console.log("empty input field");
  } else {
    updateURLParameter(searchValue);
    renderSearchResults(searchValue);
  }
});

function triggerSearchFromURL() {
  let params = new URLSearchParams(window.location.search);
  const searchInput = document.getElementById("search-input");
  if (params.has("search")) {
    let searchValue = params.get("search");
    searchInput.value = searchValue; // Use value for input fields
    renderSearchResults(searchValue);
  }
}

function updateURLParameter(searchValue) {
  let params = new URLSearchParams(window.location.search);
  params.set("search", searchValue);
  let newUrl = window.location.pathname + "?" + params.toString();
  window.history.replaceState({}, "", newUrl);
}

export async function renderSearchResults(searchValue) {
  startLoading("search-button");
  const url = `https://api.noroff.dev/api/v1/auction/listings?_bids=true&_tag=${searchValue}`;
  const res = await fetch(url, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  checkForErrors(data);
  const container = document.getElementById("card-container");
  const filterBtn = document.querySelector(".filter-cards");
  filterBtn.style.display = "flex";
  container.innerHTML = "";
  if (data.length === 0) {
    stopLoading("search-button");
    const filterBtn = document.querySelector(".filter-cards");
    filterBtn.style.display = "none";
    const button = document.getElementById("search-button");
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#141918" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>';
    container.innerHTML = '<h2 class="no-results">No results found</h2>';
  }
  if (data) {
    for (const item of data) {
      await renderCard(item, container);
      stopLoading("search-button");
      const button = document.getElementById("search-button");
      button.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#141918" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>';
    }
  } else {
    stopLoading("search-button");
    const button = document.getElementById("search-button");
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path opacity="1" fill="#141918" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>';
    console.error(data);
  }
}
