import getLocalStorageData from "./localStorage.mjs";

export default function writeCredits() {
  const data = getLocalStorageData("all");
  const creditContainer = document.querySelector("#credits-container");
  creditContainer.innerHTML = `<p class="credits-label">Credits:</p> <p class="credits-amount">${data.credits}</p>`;
}
