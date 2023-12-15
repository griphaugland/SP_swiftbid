export default function openCreateListing() {
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
    <div class="modal fade" id="createListingPopUp" tabindex="-1" aria-labelledby="createListingPopUpLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createListingPopUpLabel">Create a listing</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="profile-form">
            <label class="mt-2" for="form-title">Give your listing a title:</label>
            <input type="text" class="form-control" id="form-title" name="form-title" placeholder="A beautiful statue of Obama">
            <label class="mt-2" for="form-description">Describe your listing:</label>
            <input type="text" class="form-control" id="form-description" name="form-description" placeholder="A small golden statue of the previous president Barack Obama">
            <label class="mt-2" for="form-tags">Tag your listing:</label>
            <div class="input-group mb-3">
            <input type="text" class="form-control" id="form-tags" aria-label="form-tags" aria-describedby="add-button" name="form-tags" placeholder="statue">
             <button class="btn btn-outline-secondary" type="button" id="add-button">Add</button>
            </div>
            <ul class="tag-container">
            <li>cute</li>
            <li>statue</li>
            <li>obama</li>
            </ul>
            <label class="mt-2" for="form-media-url">Paste an image link:</label>
            <input type="text" class="form-control" id="form-media-url" name="form-media-url" placeholder="https://www.randomimageurl.com/beautiful-statue-of-obama">
            <label class="mt-2" for="form-endsAt">Enter the auction end date:</label>
            <input type="date" class="form-control" id="form-endsAt" name="form-endsAt" placeholder="">
        </div>
        <p id="profile-error" class="text-danger"></p>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" id="createListingPopUpSubmit" class="btn btn-primary">Save</button>
        </form>
        </div>
      </div>
    </div>
  </div>`;

  document.body.appendChild(modalContainer);
  const addBtn = document.getElementById("add-button");
  const tagUl = document.querySelector("tag-container");
  const tagInput = document.getElementById("form-tags");
  addBtn.addEventListener("click", () => {
    let tagValue = tagInput.value;
  });
  const profileImagePopUp = document.querySelector(".profile-image-popup");
  const currentMediaSrc = document.getElementById("current-media-url");
  console.log("test");
  modalContainer.style.position = "absolute";
  currentMediaSrc.disabled = false;
  var createListingModal = new bootstrap.Modal(
    document.getElementById("createListingPopUp"),
    {
      backdrop: "static",
    }
  );
  createListingModal.show();
}
