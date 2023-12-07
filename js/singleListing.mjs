import fetchContent from "./modules/fetchContent.mjs";

async function SingleListingFetchFromURL() {
  let params = new URLSearchParams(window.location.search);
  if (params.has("id")) {
    const id = params.get("id");
    const content = await fetchContent("getSingle", id);
    console.log(content);
  } else {
    console.log("no id found");
  }
}
SingleListingFetchFromURL();
