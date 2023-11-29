import renderNav from "./handleLoggedIn.mjs";

export default function manageLoggedIn() {
  renderNav();
  function openLoginPopUp() {
    const localStorageCheck = localStorage.getItem("status");
    if (localStorageCheck === null || undefined) {
      buildLoginPopUp();
    } else if (localStorageCheck === "guest") {
      console.log("Already confirmed guest access");
    }
  }

  function buildLoginPopUp() {
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = `
        <div class="modal fade" id="wantToLogIn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Login Suggested</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        You have to be logged in to bid.
                    </div>
                    <div class="modal-footer">
                    <button type="button" id="continueAsGuest" class="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
                        <a type="button" href="../auth/login" class="btn btn-primary">LOGIN</a>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.appendChild(modalContainer);
    var myModal = new bootstrap.Modal(document.getElementById("wantToLogIn"), {
      keyboard: false,
    });
    myModal.show();
    document.getElementById("continueAsGuest").addEventListener("click", () => {
      localStorage.setItem("status", "guest");
    });
  }
  openLoginPopUp();
}
