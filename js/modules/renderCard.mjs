import fetchContent from "./fetchContent.mjs";
export default async function renderCards() {
  const content = await fetchContent("getAll");
  const slicedContent = content.slice(0, 20);
  console.log(slicedContent);
  const container = document.getElementById("card-container");

  // Clear previous content
  container.innerHTML = "";

  slicedContent.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    let credits;
    if (item._count.bids < 2 && item._count.bids > 0) {
      credits = "credit";
    } else {
      credits = "credits";
    }
    let image;
    if (item.media[0] === undefined || null) {
      image === "https://placehold.co/200x100";
    } else {
      image = item.media[0];
    }
    card.innerHTML = `
      <img src="${item.media[0]}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item._count.bids} ${credits}</p>
      <button id="card-bid-button" class="bid-button">BID</button>
    `;
    container.appendChild(card);
  });
}
