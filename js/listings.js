import renderCards from "./modules/renderCard.mjs";
import renderPlaceholderCards from "./modules/renderPlaceholderCards.mjs";
import initializeSearch from "./modules/search.mjs";
import { pagination } from "./modules/pagination.mjs";
renderPlaceholderCards();
let params = new URLSearchParams(window.location.search);
if (params.has("search")) {
  initializeSearch();
} else {
  if (params.has("offset")) {
    pagination();
  } else {
    renderCards();
  }
}
