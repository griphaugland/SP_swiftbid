import fetchContent from "./modules/fetchContent.mjs";
import { renderSingleCard } from "./modules/renderSingleCard.mjs";

async function SingleListingFetchFromURL() {
  const container = document.getElementById("listing-container");
  let params = new URLSearchParams(window.location.search);
  if (params.has("id")) {
    const id = params.get("id");
    const content = await fetchContent("getSingle", id);
    console.log(content);
    await renderSingleCard(content, container);
  } else {
    console.log("no id found");
  }
}
SingleListingFetchFromURL();
