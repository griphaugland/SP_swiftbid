import fetchContent from "./modules/fetchContent.mjs";
import { renderSingleCard } from "./modules/renderSingleCard.mjs";
import getLocalStorageData from "./modules/localStorage.mjs";
import postListing from "./modules/postListing.mjs";

export async function SingleListingFetchFromURL() {
  const container = document.getElementById("listing-container");
  let params = new URLSearchParams(window.location.search);
  if (params.has("id")) {
    const id = params.get("id");
    const content = await fetchContent("getSingle", id);
    await renderSingleCard(content, container);
  } else if (params.has("preview")) {
    const localStorageData = getLocalStorageData("all");
    let tags = params.get("tags").split(",");
    if (tags.length === 1 && tags[0] === "") {
      tags = [];
    }
    let mediaParam = params.get("media");
    let mediaArray;
    if (mediaParam && mediaParam !== "") {
      mediaArray = mediaParam.split(",");
    } else {
      mediaArray = [];
    }
    let parameterData = {
      title: params.get("title"),
      description: params.get("description") || "",
      tags: tags,
      media: mediaArray,
      endsAt: params.get("endsAt"),
      _count: {},
      bids: [],
      seller: {
        avatar: localStorageData.avatar,
        email: localStorageData.email,
        name: localStorageData.name,
      },
    };
    const singlePostMain = document.querySelector("main");
    const previewFooter = document.createElement("div");
    previewFooter.classList.add("previewFooter");
    const previewing = document.createElement("h4");
    previewing.style.color = "white";
    previewing.classList.add("preview-text");
    previewing.innerText = `Previewing: ${parameterData.title}`;
    const goBackButton = document.createElement("button");
    goBackButton.classList.add("PreviewingButton");
    goBackButton.classList.add("btn");
    goBackButton.classList.add("btn-outline-secondary");
    goBackButton.id = "PreviewingButton-GOBACK";
    goBackButton.innerText = "Go back";
    goBackButton.addEventListener("click", () => {
      params.set("user", localStorageData.name);
      params.set("create", "true");
      params.delete("preview");
      window.location.href = "../../profile/" + "?" + params;
    });
    const postButton = document.createElement("button");
    postButton.classList.add("PreviewingButton");
    postButton.classList.add("btn");
    postButton.classList.add("btn-primary");
    postButton.id = "PreviewingButton-POST";
    postButton.innerText = "Post";
    postButton.addEventListener("click", () => {
      postListing(parameterData);
      setTimeout(() => {
        const createdPost = sessionStorage.getItem("postID");
        params.delete("preview");
        params.delete("title");
        params.delete("description");
        params.delete("tags");
        params.delete("media");
        params.delete("endsAt");
        params.set("id", createdPost);
      }, 1000);
      setTimeout(() => {
        window.location.href = window.location.pathname + "?" + params;
      }, 2000);
    });
    await renderSingleCard(parameterData, container);
    previewFooter.append(goBackButton, previewing, postButton);
    singlePostMain.append(previewFooter);
  } else {
    console.log("no id found");
  }
}
SingleListingFetchFromURL();
