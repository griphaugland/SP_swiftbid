import manageLoggedIn from "./modules/loginPopUp.mjs";
import logout from "./modules/logout.mjs";
import renderCards from "./modules/renderCard.mjs";

const hamBars = document.querySelectorAll(".ham-bar");
document
  .querySelector("#navbarText")
  .addEventListener("show.bs.collapse", function () {
    hamBars.forEach((bar) => {
      bar.style.backgroundColor = "#fd6a01";
    });
  });

document
  .querySelector("#navbarText")
  .addEventListener("hide.bs.collapse", function () {
    hamBars.forEach((bar) => {
      bar.style.backgroundColor = "#333";
    });
  });

const logoutBtn = document.querySelector("#logout-button");
logoutBtn.addEventListener("click", () => {
  logout();
});

manageLoggedIn();

renderCards();
