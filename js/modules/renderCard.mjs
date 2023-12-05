import fetchContent from "./fetchContent.mjs";
export default async function renderCards() {
  const content = await fetchContent("getAll");
  let slicedContent = content.slice(0, 20);
  console.log(slicedContent);
  const container = document.getElementById("card-container");

  if (slicedContent) {
    // Clear previous content
    container.innerHTML = "";

    slicedContent.forEach((item) => {
      container.appendChild(renderCard(item));
    });
  }
}

export function renderCard(item) {
  const card = document.createElement("div");
  card.className = "card-listing";
  const expirationDate = new Date(item.endsAt);
  const currentDate = new Date();
  let difference = expirationDate.getTime() - currentDate.getTime();
  // Convert milliseconds to minutes
  difference = difference / 1000 / 60;
  let timeLeft;
  let color;
  if (difference < 0) {
    timeLeft = `Expired`;
    color = "red";
  } else if (difference < 1) {
    timeLeft = `Any second now`;
    color = "red-yellow";
  } else if (difference < 60) {
    timeLeft = `${Math.floor(difference)} min`;
    color = "yellow";
  } else if (difference < 1440) {
    const hours = Math.floor(difference / 60);
    if (hours < 2) {
      timeLeft = `${hours} hour`;
    } else {
      timeLeft = `${hours} hours`;
    }
    color = "green";
  } else if (difference < 10080) {
    const days = Math.floor(difference / 60 / 24);
    if (days < 2) {
      timeLeft = `${days} day`;
    } else {
      timeLeft = `${days} days`;
    }
    color = "green";
  } else if (difference < 43800) {
    const weeks = Math.floor(difference / 60 / 24 / 7);
    if (weeks < 2) {
      timeLeft = `${weeks} week`;
    } else {
      timeLeft = `${weeks} weeks`;
    }
    color = "green";
  } else {
    const months = Math.floor(difference / 60 / 24 / 30);
    timeLeft = `${months} months`;
    color = "green";
  }

  let credits;
  if (item._count.bids < 2 && item._count.bids > 0) {
    credits = "credit";
  } else {
    credits = "credits";
  }
  let media;
  if (!item.media[0]) {
    media = "https://fakeimg.pl/275x140/ffffff/ababab?text=No+Image+Found";
  } else {
    media = item.media[0];
  }
  if (item.media[0] === undefined) {
    media = "https://fakeimg.pl/275x140/ffffff/ababab?text=No+Image+Found";
  }

  card.innerHTML = `
  <div class="card-top-bar">
    <p class="timer-listing ${color}">${timeLeft}</p>
  </div>
  <div class="card-image-container">
    <img src="${media}" height="100px" width="200px" alt=" Alt text:${item.title}" />
  </div>
  <div class="card-text-container">
    <div class="title-price-container">
      <h3>${item.title}</h3>
      <p>${item._count.bids} ${credits}</p>
    </div>
    <a id="card-bid-button" class="bid-button" href="../listings/${item.id}">BID</a>
  </div>
`;
  return card;
}
