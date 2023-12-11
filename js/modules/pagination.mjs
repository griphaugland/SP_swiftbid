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
}

function increaseOffset() {
  console.log(offset);
  offset += 20;
  window.location.href = `/listings/?offset=${offset}`;
  console.log(offset);
}

function decreaseOffset() {
  console.log(offset);
  offset -= 20;
  if (offset < 0) offset = 0;
  window.location.href = `/listings/?offset=${offset}`;
  console.log(offset);
}

nextBtn.onclick = increaseOffset;
prevBtn.onclick = decreaseOffset;

/* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  background-color: #ff923c;
  padding: 0.3rem;
  padding-inline: 0.9rem; */
