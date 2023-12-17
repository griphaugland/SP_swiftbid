import checkForErrors from "./checkForErrors.mjs";
import { renderCard } from "./renderCard.mjs";

export async function pagination() {
  const container = document.getElementById("card-container");
  let params = new URLSearchParams(window.location.search);
  const offset = params.get("offset");
  async function getListings() {
    const url = `https://api.noroff.dev/api/v1/auction/listings/?_active=true&sort=endsAt&sortOrder=asc&_bids=true&_seller=true&limit=12&offset=${offset}`;
    const res = await fetch(url, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    checkForErrors(data);
    return data;
  }
  const content = await getListings();
  if (content) {
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
  offset = parseInt(params.get("offset"), 10);
  prevBtn.style.display = "inline-block";
  if (offset === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline-block";
  }
}
if (params.has("search")) {
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
}

function increaseOffset() {
  offset += 12;
  params.set("offset", offset);
  window.location.href = window.location.pathname + "?" + params;
}

function decreaseOffset() {
  offset -= 12;
  if (offset < 0) offset = 0;
  params.set("offset", offset);
  window.location.href = window.location.pathname + "?" + params;
}

nextBtn.onclick = increaseOffset;
prevBtn.onclick = decreaseOffset;
