import { renderCategories } from "./modules/renderCategories.mjs";

renderCategories();

/* SEARCH */
let params = new URLSearchParams(window.location.search);
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = searchInput.value;
  if (searchValue === "") {
    console.log("empty input field");
  } else {
    params.set("search", searchValue);
    let newUrl = "/listings/" + "?" + params.toString();
    window.location.href = newUrl;
  }
});
