import { startLoading, stopLoading } from "./loader.mjs";
import openPreviewListing from "./openPreviewPage.mjs";
import getLocalStorageData from "./localStorage.mjs";
import editListing from "./editListing.mjs";

export default function openEditListing() {
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
    <div class="modal fade" id="editListingPopUp" tabindex="-1" aria-labelledby="editListingPopUpLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
    <form id="edit-listing-form">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editListingPopUpLabel">Edit your listing</h1>
          <button type="button" class="btn-close close-create-modal" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <label class="mt-2" for="form-title">Change your listing title:</label>
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
        </div>
        <p id="profile-error" class="create-error-message text-danger"></p>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary close-create-modal" data-bs-dismiss="modal">Close</button>
          <button type="submit" id="editListingPopUpSubmit" class="btn btn-primary">Edit</button>
        </div>
      </div>
      </form>
    </div>
  </div>`;

  document.body.appendChild(modalContainer);
  let params = new URLSearchParams(window.location.search);
  const editForm = document.getElementById("edit-listing-form");
  const closeCreateModal = document.querySelectorAll(".close-create-modal");
  const addBtn = document.getElementById("add-button");
  const tagUl = document.querySelector(".tag-container");
  const titleInput = document.getElementById("form-title");
  const descriptionInput = document.getElementById("form-description");
  const tagInput = document.getElementById("form-tags");
  const mediaUrlInput = document.getElementById("form-media-url");
  const feedback = document.getElementById("profile-error");
  const titleFeedback = document.getElementById("title-error");
  const descriptionFeedback = document.getElementById("description-error");
  const tagFeedback = document.getElementById("tag-error");
  const mediaFeedback = document.getElementById("media-url-error");
  const noTagswarning = document.createElement("p");
  const tagCounter = document.querySelector("#tagCounter");
  const submitBtn = document.getElementById("editListingPopUpSubmit");
  let localStorageData = getLocalStorageData("all");
  let mediaIsValid;
  let tagArr = [];
  if (params.has("title")) {
    const modalHeader = document.querySelector("#editListingPopUpLabel");
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
      let parameterData = {
        title: params.get("title"),
        description: params.get("description") || "",
        tags: params.get("tags").split(",") || [],
        media: params.get("media").split(","),
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
        console.log(tagArr);
        console.log(tagValueItems);
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
      console.log(tagArr);
      mediaUrlInput.value = parameterData.media;
      handleMediaUrlInput();
      modalHeaderLoader.remove();
    }, 500);
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
      console.log(tagArr);
      console.log(tagValueItems);
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
    let tags = true;
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
    if (mediaIsValid) {
      media = true;
      mediaArr.push(mediaUrlInput.value);
      let sendingMedia;
      if (mediaArr.length > 1) {
        sendingMedia = mediaArr;
      } else {
        sendingMedia = mediaUrlInput.value;
      }
    } else if (mediaUrlInput.value === "") {
      media = true;
    } else {
      media = false;
    }
    if (
      title === true &&
      description === true &&
      tags === true &&
      media === true
    ) {
      let data = {
        title: titleInput.value,
        description: descriptionInput.value || "",
        tags: tagArr || [],
        media: mediaArr,
      };
      editListing(data, params.get("id"));
      setTimeout(() => {
        window.location.href = `/listings/listing/` + "?" + params;
      }, 1500);
    } else {
      console.log(
        "title",
        title,
        "description",
        description,
        "tags",
        tags,
        "media",
        media
      );
      console.log("error found");
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

  const imageLoader = document.createElement("div");
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
        console.log(`ValidImage`);
        mediaFeedback.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"><p class="response-text-create" id="valid-image">Valid image</p>`;
        mediaUrlInput.disabled = true;
        mediaFeedback.append(editCurrentImageLink);
        mediaIsValid = true;
        return true;
      } else {
        console.log(`FalseImage`);
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
        console.log(`ValidImage`);
        mediaIsValid = true;
        mediaFeedback.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"><p class="response-text-create">Valid image</p>`;
        mediaUrlInput.disabled = true;
        mediaFeedback.append(editCurrentImageLink);
        return true;
      } else {
        console.log(`FalseImage`);
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

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    startLoading("editListingPopUpSubmit");
    validateListing();
    stopLoading("editListingPopUpSubmit");
    submitBtn.innerText = "Edit";
  });

  tagInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addBtn.click();
    }
  });

  var editListingModal = new bootstrap.Modal(
    document.getElementById("editListingPopUp"),
    {
      backdrop: "static",
    }
  );
  editListingModal.show();
}
