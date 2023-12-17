import postListing from "./postListing.mjs";
import { startLoading, stopLoading } from "./loader.mjs";
import openPreviewListing from "./openPreviewPage.mjs";
import getLocalStorageData from "./localStorage.mjs";

export default function openCreateListing() {
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
    <div class="modal fade" id="createListingPopUp" tabindex="-1" aria-labelledby="createListingPopUpLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
    <form id="create-listing-form">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createListingPopUpLabel">Create a listing</h1>
          <button type="button" class="btn-close close-create-modal" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <label class="mt-2" for="form-title">Give your listing a title:</label>
            <input type="text" class="form-control" id="form-title" name="form-title" placeholder="A beautiful statue of Obama">
            <p id="title-error" class="create-error-message text-danger"></p>
            <label class="mt-2" for="form-description">Describe your listing:</label>
            <input type="text" class="form-control" id="form-description" name="form-description" placeholder="A small golden statue of the previous president Barack Obama">
            <p id="description-error" class="create-error-message text-danger"></p>
            <label class="mt-2" for="form-tags">Tag your listing:</label>
            <div class="input-group">
            <input type="text" class="form-control" id="form-tags" aria-label="form-tags" aria-describedby="add-button" name="form-tags" placeholder="statue">
             <button class="btn btn-outline-secondary" type="button" id="add-button">Add</button>
            </div>
            <p id="tag-error" class="create-error-message text-danger"></p>
            <label id="tagCounter" for="tag-container">Added tags (0):</label>
            <ul class="tag-container" name="tag-container">
            </ul>
            <label class="mt-2" for="form-media-url">Paste an image link:</label>
            <input type="text" class="form-control" id="form-media-url" name="form-media-url" placeholder="https://www.randomimageurl.com/beautiful-statue-of-obama">
            <p id="media-url-error" class="create-error-message text-danger"></p>
            <label class="mt-2" for="form-endsAt">Enter the auction end date:</label>
            <input type="date" class="form-control" id="form-endsAt" name="form-endsAt" placeholder="">
            <p id="date-error" class="text-danger"></p>
        </div>
        <p id="profile-error" class="create-error-message text-danger"></p>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary close-create-modal" data-bs-dismiss="modal">Close</button>
          <button type="submit" id="createListingPopUpSubmit" class="btn btn-primary">Preview & Post</button>
        </div>
      </div>
      </form>
    </div>
  </div>`;

  document.body.appendChild(modalContainer);
  let params = new URLSearchParams(window.location.search);
  const createForm = document.getElementById("create-listing-form");
  const closeCreateModal = document.querySelectorAll(".close-create-modal");
  const addBtn = document.getElementById("add-button");
  const tagUl = document.querySelector(".tag-container");
  const titleInput = document.getElementById("form-title");
  const descriptionInput = document.getElementById("form-description");
  const tagInput = document.getElementById("form-tags");
  const mediaUrlInput = document.getElementById("form-media-url");
  const endsAtInput = document.getElementById("form-endsAt");
  const feedback = document.getElementById("profile-error");
  const titleFeedback = document.getElementById("title-error");
  const descriptionFeedback = document.getElementById("description-error");
  const tagFeedback = document.getElementById("tag-error");
  const mediaFeedback = document.getElementById("media-url-error");
  const dateFeedback = document.getElementById("date-error");
  const noTagswarning = document.createElement("p");
  const tagCounter = document.querySelector("#tagCounter");
  const submitBtn = document.getElementById("createListingPopUpSubmit");
  const imageLoader = document.createElement("div");
  let localStorageData = getLocalStorageData("all");
  let mediaIsValid;
  let tagArr = [];
  if (params.has("title") && params.has("endsAt")) {
    const modalHeader = document.querySelector("#createListingPopUpLabel");
    modalHeader.style.display = "flex";
    modalHeader.style.alignItems = "center";
    const modalHeaderLoader = document.createElement("div");
    modalHeaderLoader.innerHTML = `<div class="spinner-container w-100 d-flex align-items-center justify-content-center h-25">
       <div class="spinner">
          <div class="dot1"></div>
          <div class="dot2"></div>
       </div>
    </div>`;
    modalHeader.append(modalHeaderLoader);
    setTimeout(() => {
      const localStorageData = getLocalStorageData("all");
      let mediaParam = params.get("media");
      let mediaArray;
      if (mediaParam && mediaParam !== "") {
        mediaArray = mediaParam.split(",");
      } else {
        mediaArray = [];
      }
      let tagsValue = params.get("tags").split(",");
      if (tagsValue.length === 1 && tagsValue[0] === "") {
        tagsValue = [];
      }
      tagArr = [];
      let parameterData = {
        title: params.get("title"),
        description: params.get("description") || "",
        tags: tagsValue,
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
      titleInput.value = parameterData.title;
      descriptionInput.value = parameterData.description;
      let count = 0;
      parameterData.tags.forEach((item) => {
        const tagValueLI = document.createElement("li");
        const removeTag = document.createElement("div");
        removeTag.innerHTML = "remove";
        let tagValue = item;
        const tagValueText = document.createElement("p");
        tagValueText.classList.add("tag-value-text");
        tagValueText.innerText = tagValue;
        tagValueLI.append(tagValueText, removeTag);
        tagValueLI.classList.add("tag-value");
        tagValueLI.id = `${count++}-tag`;
        tagUl.append(tagValueLI);
        tagArr.push(item);
        let tagValueItems = document.querySelectorAll(".tag-value");
        tagCounter.innerText = `Added tags (${tagArr.length}):`;
        tagValueItems.forEach((item) => {
          item.addEventListener("click", () => {
            const tagToRemove = item.querySelector(".tag-value-text").innerText;
            const indexToRemove = tagArr.indexOf(tagToRemove);
            if (indexToRemove !== -1) {
              tagArr.splice(indexToRemove, 1);
            }
            item.remove();
            tagCounter.innerText = `Added tags (${tagArr.length}):`;
          });
        });
        tagInput.value = "";
      });
      tagCounter.innerText = `Added tags (${tagArr.length}):`;
      mediaUrlInput.value = parameterData.media;
      dateFeedback.innerHTML =
        '<p class="response-text-create warning">Please input date again</p>';
      modalHeaderLoader.remove();
    }, 1000);
    handleMediaUrlInput();
  }
  if (tagUl.children.length === 0) {
    tagUl.append(noTagswarning);
  } else {
    noTagswarning.style.display = "none";
  }
  let count = 0;
  let renderedListItem = false;
  function toggleRenderedListItem() {
    if (tagUl.children.length > 1) {
      renderedListItem = renderedListItem;
    } else {
      renderedListItem = !renderedListItem;
    }
  }
  addBtn.addEventListener("click", () => {
    if (tagInput.value === "") {
      tagFeedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text-create">Tag cannot be empty</p>`;
    } else if (tagArr.includes(tagInput.value)) {
      tagFeedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text-create">Already added that tag</p>`;
    } else {
      toggleRenderedListItem();
      tagFeedback.innerText = "";
      const tagValueLI = document.createElement("li");
      const removeTag = document.createElement("div");
      removeTag.innerHTML = "remove";
      noTagswarning.innerText = "No tags added";
      noTagswarning.style.display = "none";
      let tagValue = tagInput.value;
      const tagValueText = document.createElement("p");
      tagValueText.classList.add("tag-value-text");
      tagValueText.innerText = tagValue;
      tagValueLI.append(tagValueText, removeTag);
      tagValueLI.classList.add("tag-value");
      tagValueLI.id = `${count++}-tag`;
      tagUl.append(tagValueLI);
      tagArr.push(tagValue);
      let tagValueItems = document.querySelectorAll(".tag-value");
      tagCounter.innerText = `Added tags (${tagArr.length}):`;
      tagValueItems.forEach((item) => {
        item.addEventListener("click", () => {
          const tagToRemove = item.querySelector(".tag-value-text").innerText;
          const indexToRemove = tagArr.indexOf(tagToRemove);
          if (indexToRemove !== -1) {
            tagArr.splice(indexToRemove, 1);
          }
          item.remove();
          tagCounter.innerText = `Added tags (${tagArr.length}):`;
        });
      });
      tagInput.value = "";
    }
  });
  const profileImagePopUp = document.querySelector(".profile-image-popup");
  const currentMediaSrc = document.getElementById("current-media-url");
  modalContainer.style.position = "absolute";
  currentMediaSrc.disabled = false;

  closeCreateModal.forEach((item) => {
    item.addEventListener("click", () => {
      params.delete("create");
      params.delete("title");
      params.delete("description");
      params.delete("media");
      params.delete("endsAt");
      params.delete("tags");
      params.delete("edit");
      window.location.href = window.location.pathname + "?" + params;
    });
  });

  function validateListing() {
    const mediaResponseText = document.getElementById("#valid-image");
    let title;
    let description;
    let tags;
    let media;
    let date;
    let mediaArr = [];
    if (titleInput.value.length > 0) {
      title = true;
      titleFeedback.innerHTML = ``;
    } else {
      titleFeedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text-create">Title cannot be empty</p>`;
      title = false;
    }
    if (descriptionInput.value.length > 500) {
      description = false;
    } else {
      description = true;
    }
    if (tagInput.value.length > 0) {
      tags = false;
      tagFeedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text-create">Submit your tags before proceeding</p>`;
    } else {
      tags = true;
      titleFeedback.innerHTML = ``;
    }
    if (mediaIsValid) {
      media = true;
      mediaArr.push(mediaUrlInput.value);
    } else if (mediaUrlInput.value === "") {
      media = true;
    } else {
      media = false;
    }
    const dateInputValue = endsAtInput.value;
    const sendingDate = new Date(dateInputValue);
    if (checkDate(dateInputValue)) {
      date = true;
    } else {
      date = false;
    }
    if (
      title === true &&
      description === true &&
      tags === true &&
      media === true &&
      date === true
    ) {
      let data = {
        title: titleInput.value,
        description: descriptionInput.value || "",
        tags: tagArr || [],
        media: mediaArr,
        endsAt: sendingDate,
        _count: {},
        bids: [],
        seller: {
          avatar: localStorageData.avatar,
          email: localStorageData.email,
          name: localStorageData.name,
        },
      };
      openPreviewListing(data);
    } else {
      console.log(
        "title",
        title,
        "description",
        description,
        "tags",
        tags,
        "media",
        media,
        "date",
        date
      );
      console.log("error found");
    }
  }
  function checkDate(date) {
    const convertedDate = new Date(date);
    const currentDate = new Date();
    if (convertedDate.getTime() < currentDate.getTime()) {
      dateFeedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text-create">Date is invalid, cannot be in the past</p>`;
      return false;
    } else if (isNaN(convertedDate.getTime())) {
      dateFeedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text-create">Date is invalid, please check your date again</p>`;
      return false;
    } else {
      console.log("Date is valid");
      dateFeedback.innerHTML = "";
      return true;
    }
  }
  async function isImgUrl(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
    });
  }

  imageLoader.classList.add("image-loader-container");
  imageLoader.innerHTML = `
  <div class="spinner-container w-100 d-flex align-items-center justify-content-center h-25">
      <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
    </div>
  `;
  const editCurrentImageLink = document.createElement("p");
  editCurrentImageLink.innerText = "edit";
  editCurrentImageLink.classList.add("editCurrentImageLink");
  editCurrentImageLink.addEventListener("click", () => {
    mediaUrlInput.disabled = false;
    mediaUrlInput.value = "";
    editCurrentImageLink.remove();
  });
  mediaUrlInput.addEventListener("paste", async () => {
    mediaFeedback.innerHTML = "";
    mediaFeedback.append(imageLoader);
    setTimeout(async () => {
      if (await isImgUrl(mediaUrlInput.value)) {
        mediaFeedback.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"><p class="response-text-create" id="valid-image">Valid image</p>`;
        mediaUrlInput.disabled = true;
        mediaFeedback.append(editCurrentImageLink);
        mediaIsValid = true;
        return true;
      } else {
        mediaIsValid = false;
        mediaFeedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text-create">Not a valid image</p>`;
        return false;
      }
    }, 2000);
  });
  mediaUrlInput.addEventListener("keyup", async () => {
    if (mediaUrlInput.value.length > 20) {
      handleMediaUrlInput();
    }
  });
  function handleMediaUrlInput() {
    mediaFeedback.innerHTML = "";
    mediaFeedback.append(imageLoader);
    setTimeout(async () => {
      if (await isImgUrl(mediaUrlInput.value)) {
        mediaIsValid = true;
        mediaFeedback.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"><p class="response-text-create">Valid image</p>`;
        mediaUrlInput.disabled = true;
        mediaFeedback.append(editCurrentImageLink);
        return true;
      } else {
        mediaIsValid = false;
        mediaFeedback.innerHTML = `<img height="20" width="20" alt="error icon" src="../../media/circle-exclamation-solid.svg"><p class="response-text-create">Not a valid image</p>`;
        return false;
      }
    }, 1000);
  }
  titleInput.addEventListener("keyup", () => {
    if (titleInput.value.length > 0) {
      titleFeedback.innerHTML = ``;
    }
  });

  createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    startLoading("createListingPopUpSubmit");
    validateListing();
    stopLoading("createListingPopUpSubmit");
    submitBtn.innerText = "Post";
  });

  tagInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addBtn.click();
    }
  });
  endsAtInput.addEventListener("change", () => {
    checkDate(endsAtInput.value);
  });

  var createListingModal = new bootstrap.Modal(
    document.getElementById("createListingPopUp"),
    {
      backdrop: "static",
    }
  );
  createListingModal.show();
}
