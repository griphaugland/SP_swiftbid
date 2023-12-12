import renderCards from "./modules/renderCard.mjs";
import initializeSearch from "./modules/search.mjs";
import { pagination } from "./modules/pagination.mjs";
let params = new URLSearchParams(window.location.search);
if (params.has("search")) {
  initializeSearch();
} else {
  renderCards();
}

const filterEndingSoon = document.getElementById("filter-ending-soon");
const filterRecentlyListed = document.getElementById("filter-recently-listed");
const filterExpired = document.getElementById("filter-expired");

filterEndingSoon.addEventListener("click", () => {
  let params = new URLSearchParams(window.location.search);
  params.set("filter", 1);
  params.set("offset", 0);
  window.location.href = window.location.pathname + "?" + params;
});
filterRecentlyListed.addEventListener("click", () => {
  let params = new URLSearchParams(window.location.search);
  params.set("filter", 2);
  params.set("offset", 0);
  window.location.href = window.location.pathname + "?" + params;
});
filterExpired.addEventListener("click", () => {
  let params = new URLSearchParams(window.location.search);
  params.set("filter", 3);
  params.set("offset", 0);
  window.location.href = window.location.pathname + "?" + params;
});
