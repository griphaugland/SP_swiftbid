import fetchContent from "./fetchContent.mjs";

export default async function renderCards() {
  const content = await fetchContent("getAll");
  let slicedContent = content.slice(0, 20);
  const container = document.getElementById("card-container");

  if (slicedContent) {
    // Clear previous content
    container.innerHTML = "";

    slicedContent.forEach((item) => {
      renderCard(item, container);
    });
  }
}

export function isValidImageSrc(src, callback) {
  let img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = src;
}

export function updateCardWithMedia(item, media, container) {
  const hourglass = "../../media/hourglass-half-regular.svg";
  const hand = "../../media/hand-sparkles-solid.svg";
  const card = document.createElement("div");
  card.className = "card-listing";
  const expirationDate = new Date(item.endsAt);
  const currentDate = new Date();
  let difference = expirationDate.getTime() - currentDate.getTime();
  difference = difference / 1000 / 60; // Convert milliseconds to minutes
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
      timeLeft = `
      ${hours} hour`;
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

  let credits = item._count.bids === 1 ? "credit" : "credits";

  function getHighestAmount() {
    if (item.bids.length === 0) {
      return 0;
    }
    const amountArray = item.bids.map((item) => item.amount);
    const currentPrice = Math.max(...amountArray);
    return currentPrice;
  }
  const price = getHighestAmount();
  // Create card element
  card.className = "card-listing";

  // Create and append the top bar
  const topBar = document.createElement("div");
  topBar.className = "card-top-bar";

  const timer = document.createElement("p");
  timer.className = `timer-listing ${color}`;

  const hourglassImg = new Image();
  hourglassImg.src = hourglass;
  hourglassImg.alt = "hourglass";
  hourglassImg.height = 14;
  hourglassImg.width = 12;

  timer.appendChild(hourglassImg);
  timer.append(document.createTextNode(` ${timeLeft}`));

  topBar.appendChild(timer);
  card.appendChild(topBar);

  // Create and append the image container
  const imageContainer = document.createElement("div");
  imageContainer.className = "card-image-container";

  const img = new Image();
  img.src = media;
  img.height = 100;
  img.width = 200;
  img.alt = `Alt text:${item.title}`;

  imageContainer.appendChild(img);
  card.appendChild(imageContainer);

  // Create and append the text container
  const textContainer = document.createElement("div");
  textContainer.className = "card-text-container";

  const titlePriceContainer = document.createElement("div");
  titlePriceContainer.className = "title-price-container";

  const title = document.createElement("h3");
  if (item.title.length > 22) {
    title.innerText = item.title.substring(0, 22) + " ...";
  } else {
    title.innerText = item.title;
  }

  const pricePara = document.createElement("p");
  pricePara.innerText = `${price} ${credits}`;

  titlePriceContainer.appendChild(title);
  titlePriceContainer.appendChild(pricePara);
  textContainer.appendChild(titlePriceContainer);

  const bidButton = document.createElement("a");
  bidButton.id = "card-bid-button";
  bidButton.href = `../listings/${item.id}`;

  const handImg = new Image();
  handImg.src = hand;
  handImg.alt = "Hand icon";
  handImg.height = 35;
  handImg.width = 55;

  bidButton.appendChild(handImg);
  textContainer.appendChild(bidButton);

  card.appendChild(textContainer);

  // Append card to container
  container.appendChild(card);
}

export function renderCard(item, container) {
  return new Promise((resolve) => {
    if (!item.media[0]) {
      updateCardWithMedia(
        item,
        "https://fakeimg.pl/275x140/ffffff/ababab?text=No+Image+Found",
        container
      );
      resolve();
    } else {
      isValidImageSrc(item.media[0], (isValid) => {
        let media;
        if (isValid) {
          media = item.media[0];
        } else {
          media = "https://fakeimg.pl/275x140/ffffff/ababab?text=Invalid+Image";
        }
        updateCardWithMedia(item, media, container);
        resolve();
      });
    }
  });
}
