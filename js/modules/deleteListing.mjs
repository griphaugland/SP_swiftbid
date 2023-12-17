import getLocalStorageData from "./localStorage.mjs";
import { startLoading, stopLoading } from "./loader.mjs";

export default async function deleteListing(id) {
  let params = new URLSearchParams(window.location.search);
  const token = getLocalStorageData("accessToken");
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
  const res = await fetch(url, {
    method: `DELETE`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const feedback = document.querySelector("#delete-error");
  feedback.innerHTML = `<img height="20" width="20" alt="sucess icon" src="../../media/circle-check-regular.svg"> <p class='green'>Deleted listing</p>`;
  setTimeout(() => {
    window.location.href = "/listings/" + "?" + params;
  }, 1000);
}

export function openDeleteListing(postData) {
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
    <div class="modal fade" id="deleteListingPopUp" tabindex="-1" aria-labelledby="deleteListingPopUpLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
    <form id="delete-listing-form">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5"deleteListingPopUpLabel">Delete listing</h1>
          <button type="button" class="btn-close close-delete-modal" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
           <h6>Are you certain you want to delete post:</h6>
           <p>Title: ${postData.title}</p>
           <p>ID: ${postData.id}</p>
        </div>
        <p id="delete-error" class="delete-error-message text-danger"></p>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary close-delete-modal" data-bs-dismiss="modal">Close</button>
          <button type="submit" id="deleteListingPopUpSubmit" class="btn btn-primary">Delete</button>
        </div>
      </div>
      </form>
    </div>
  </div>`;

  document.body.appendChild(modalContainer);
  modalContainer.style.position = "absolute";
  const deleteForm = document.getElementById("delete-listing-form");
  deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    startLoading("deleteListingPopUpSubmit");
    deleteListing(postData.id);
    stopLoading("deleteListingPopUpSubmit");
    const submitBtn = document.getElementById("deleteListingPopUpSubmit");
    submitBtn.innerText = "Delete";
  });

  var deleteListingModal = new bootstrap.Modal(
    document.getElementById("deleteListingPopUp"),
    {
      backdrop: "true",
    }
  );
  deleteListingModal.show();
}
