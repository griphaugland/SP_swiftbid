import checkForErrors from "./checkForErrors.mjs";
import { renderCard } from "./renderCard.mjs";

export async function pagination() {
  const container = document.getElementById("card-container");
  let params = new URLSearchParams(window.location.search);
  const offset = params.get("offset");
  async function getListings() {
    const url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=20&offset=${offset}`;
    const res = await fetch(url, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    checkForErrors(data);
    return data;
  }
  const content = await getListings();
  if (content) {
    // Clear previous content
    container.innerHTML = "";
    content.forEach((item) => {
      renderCard(item, container);
    });
  }
}

let params = new URLSearchParams(window.location.search);
const prevBtn = document.getElementById("prevBtn");
prevBtn.style.display = "none";
const nextBtn = document.getElementById("nextBtn");
let offset = 0;
if (params.has("offset")) {
  prevBtn.style.display = "inline-block";
}
function increaseOffset() {
  console.log(offset);
  offset + 20;
  window.location.href = `/listings/?offset=${offset}`;
  console.log(offset);
}
function decreaseOffset() {
  console.log(offset);
  offset - 20;
  window.location.href = `/listings/?offset=${offset}`;
  console.log(offset);
}
nextBtn.onclick = () => {
  increaseOffset();
};
prevBtn.onclick = () => {
  decreaseOffset();
};
