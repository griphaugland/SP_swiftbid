import manageLoggedIn from "./modules/loginPopUp.mjs";
import logout from "./modules/logout.mjs";

const hamBars = document.querySelectorAll(".ham-bar");
document
  .querySelector("#navbarText")
  .addEventListener("show.bs.collapse", function () {
    hamBars.forEach((bar) => {
      bar.style.backgroundColor = "rgb(76, 133, 178)";
    });
  });

document
  .querySelector("#navbarText")
  .addEventListener("hide.bs.collapse", function () {
    hamBars.forEach((bar) => {
      bar.style.backgroundColor = "#e1e1e1";
    });
  });

const logoutBtn = document.querySelector("#logout-button");
logoutBtn.addEventListener("click", () => {
  logout();
});

manageLoggedIn();
