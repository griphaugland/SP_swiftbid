export default function openCreateListing() {
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
    <div class="modal fade" id="createListingPopUp" tabindex="-1" aria-labelledby="createListingPopUpLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createListingPopUpLabel">Create a listing</h1>
          <button type="button" class="btn-close close-create-modal" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="profile-form">
            <label class="mt-2" for="form-title">Give your listing a title:</label>
            <input type="text" class="form-control" id="form-title" name="form-title" placeholder="A beautiful statue of Obama">
            <p id="title-error" class="create-error-message text-danger"></p>
            <label class="mt-2" for="form-description">Describe your listing:</label>
            <input type="text" class="form-control" id="form-description" name="form-description" placeholder="A small golden statue of the previous president Barack Obama">
            <p id="description-error" class="create-error-message text-danger"></p>
            <label class="mt-2" for="form-tags">Tag your listing: (Recommended for search traffic)</label>
            <div class="input-group">
            <input type="text" class="form-control" id="form-tags" aria-label="form-tags" aria-describedby="add-button" name="form-tags" placeholder="statue">
             <button class="btn btn-outline-secondary" type="button" id="add-button">Add</button>
            </div>
            <p id="tag-error" class="create-error-message text-danger"></p>
            <label for="tag-container">Added tags:</label>
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
          <button type="submit" id="createListingPopUpSubmit" class="btn btn-primary">Save</button>
        </form>
        </div>
      </div>
    </div>
  </div>`;

  document.body.appendChild(modalContainer);
  let params = new URLSearchParams(window.location.search);
  const closeCreateModal = document.querySelectorAll(".close-create-modal");
  const addBtn = document.getElementById("add-button");
  const tagUl = document.querySelector(".tag-container");
  const tagInput = document.getElementById("form-tags");
  const feedback = document.getElementById("profile-error");
  const titleFeedback = document.getElementById("title-erro");
  const descriptionFeedback = document.getElementById("form-tag");
  const tagFeedback = document.getElementById("tag-error");
  const mediaFeedback = document.getElementById("media-url-error");
  const dateFeedback = document.getElementById("date-error");
  const noTagswarning = document.createElement("p");
  let tagArr = [];
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
      tagFeedback.innerText = "Tags cannot be empty";
    } else if (tagArr.includes(tagInput.value)) {
      tagFeedback.innerText = "Already added that tag";
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
      tagValueItems.forEach((item) => {
        item.addEventListener("click", () => {
          const tagToRemove = item.querySelector(".tag-value-text").innerText;
          const indexToRemove = tagArr.indexOf(tagToRemove);
          if (indexToRemove !== -1) {
            tagArr.splice(indexToRemove, 1);
          }
          item.remove();
        });
      });
    }
  });

  const profileImagePopUp = document.querySelector(".profile-image-popup");
  const currentMediaSrc = document.getElementById("current-media-url");
  modalContainer.style.position = "absolute";
  currentMediaSrc.disabled = false;

  closeCreateModal.forEach((item) => {
    item.addEventListener("click", () => {
      params.delete("create");
      window.location.href = window.location.pathname + "?" + params;
    });
  });

  var createListingModal = new bootstrap.Modal(
    document.getElementById("createListingPopUp"),
    {
      backdrop: "static",
    }
  );
  createListingModal.show();
}
