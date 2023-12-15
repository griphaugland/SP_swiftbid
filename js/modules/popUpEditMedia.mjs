export default function popUpEditMedia(data) {
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
  <div class="modal fade" id="MediaPopUp" tabindex="-1" aria-labelledby="MediaPopUpLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="MediaPopUpLabel">Change Profile Picture</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="media-form">
          <h6 class="text-center">Current Profile Picture</h6>
          <div class="profile-image-container-popup">
            <img
              src="../../media/account-image-placeholder.png"
              class="img-fluid profile-image-popup"
              id="profile-image-popup"
              height="130px"
              width="130px"
            />
          </div>
          <label for="media-url">Current image link</label>
          <input type="text" class="form-control" id="current-media-url" name="current-media-url" placeholder="https://www.randomimageurl.com/media/image">
          <label class="mt-2" for="media-url">Enter a valid image link to change</label>
          <input type="text" class="form-control" id="media-url" name="media-url" placeholder="Enter URL">
      </div>
      <p id="media-error" class="text-danger"></p>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" id="MediaPopUpSubmit" class="btn btn-primary">Save</button>
      </form>
      </div>
    </div>
  </div>
</div>`;

  document.body.appendChild(modalContainer);
  const profileImagePopUp = document.querySelector(".profile-image-popup");
  const currentMediaSrc = document.getElementById("current-media-url");
  const MediaSrc = document.getElementById("media-url");
  modalContainer.style.position = "absolute";
  profileImagePopUp.src = data.avatar;
  currentMediaSrc.value = data.avatar;
  currentMediaSrc.disabled = true;
  MediaSrc.addEventListener("keyup", () => {
    if (MediaSrc.value.length > 10) {
      profileImagePopUp.src = MediaSrc.value;
    }
  });
  currentMediaSrc.disabled = "true";
  var MediaModal = new bootstrap.Modal(document.getElementById("MediaPopUp"), {
    backdrop: "static", // You can set the backdrop option to "static" or "true" if needed.
  });
  MediaModal.show();
}
