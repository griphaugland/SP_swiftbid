import fetchContent from "./fetchContent.mjs";
import getLocalStorageData from "./localStorage.mjs";
import isLoggedIn from "./isLoggedIn.mjs";
import placeBid from "./placeBid.mjs";
const container = document.getElementById("listing-container");
const image = document.getElementById("listing-image");
const timeRemaining = document.getElementById("listing-bids");
const priceContainer = document.querySelectorAll("previous-bids-profile-link");
const listingTitle = document.getElementById("listing-title");
const listingPrice = document.getElementById("listing-price");
const bidsList = document.getElementById("bids-list");
const bidButton = document.getElementById("sendBidBtn");
let accessToken;

if (isLoggedIn()) {
  bidButton.disabled = false;
  accessToken = getLocalStorageData("accessToken");
} else {
  accessToken = null;
  bidButton.disabled = true;
  bidButton.innerText = "Log in to bid";
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
    if (months < 2) {
      timeLeft = `${months} month`;
    } else {
      timeLeft = `${months} months`;
    }
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

  card.className = "card-listing";

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

  image.src = media;
  listingTitle.innerHTML = "";
  const listingTitleName = document.createElement("span");
  listingTitleName.innerText = item.title;
  const listingTitlePrice = document.createElement("span");
  const listingTitlePriceValue = document.createElement("span");
  listingTitlePriceValue.innerText = price;
  listingTitlePriceValue.classList.add("green");
  listingTitlePrice.innerText = "Current highest bid:";
  const listingTitlePriceContainer = document.getElementById(
    "listing-title-price-container"
  );
  listingTitlePriceContainer.innerHTML = "";
  listingTitlePriceContainer.append(listingTitlePrice, listingTitlePriceValue);
  listingTitle.append(listingTitleName);

  const timeRemainingValue = document.createElement("span");
  const timeRemainingDescription = document.createElement("span");
  timeRemainingDescription.innerText = "Auction ends:";
  timeRemainingValue.innerText = timeLeft;
  timeRemainingValue.classList.add(color);
  timeRemaining.innerHTML = "";
  timeRemaining.append(timeRemainingDescription, timeRemainingValue);

  const highestBidContainerValue = document.createElement("span");
  const highestBidContainerDesc = document.createElement("span");
  highestBidContainerDesc.innerText = "Bidders";
  highestBidContainerValue.innerText = `credits`;
  listingPrice.innerHTML = "";
  listingPrice.append(highestBidContainerDesc, highestBidContainerValue);

  const listingOwnerContainer = document.getElementById("listing-owner");
  const listingOwner = document.createElement("a");
  const listingOwnerPrefix = document.createElement("span");
  listingOwner.innerText = `${item.seller.name}`;
  listingOwner.classList.add("listing-owner-name");
  listingOwner.href = `../../profile?user=${item.seller.name}`;
  listingOwnerPrefix.innerText = "Posted by:";
  listingOwnerContainer.innerHTML = "";
  listingOwnerContainer.append(listingOwnerPrefix, listingOwner);

  // Input Logic
  const bidPlus = document.querySelector(".btn-plus");
  const bidMinus = document.querySelector(".btn-minus");
  const bidInput = document.querySelector(".input-bid");
  bidInput.value = price + 1;
  const currentCredits = getLocalStorageData("credits");
  bidInput.addEventListener("change", () => {
    if (bidInput.value < price + 1) {
      bidInput.value = price + 1;
    }
    if (bidInput.value > currentCredits) {
      bidInput.value = currentCredits;
    }
    if (bidInput.type != Number) {
      bidInput.value = price + 1;
    }
  });
  bidPlus.addEventListener("click", () => {
    bidInput.value++;
    if (bidInput.value < price + 1) {
      bidInput.value = price + 1;
    }
    if (bidInput.value > currentCredits) {
      bidInput.value = currentCredits;
    }
  });
  bidMinus.addEventListener("click", () => {
    bidInput.value--;
    if (bidInput.value < price + 1) {
      bidInput.value = price + 1;
    }
  });
  bidButton.onclick = () => placeBid(item.id, bidInput.value, accessToken);

  // render bid overview
  function getBidInformation() {
    if (item.bids.length === 0) {
      return console.log("no bids");
    }
    bidsList.innerHTML = "";
    /* console.log(item.bids); */
    let sorted = item.bids.sort((a, b) => a.amount - b.amount);
    console.log(sorted);
    item.bids.forEach((item) => {
      let listItem = document.createElement("li");
      let bidderName = document.createElement("a");
      bidderName.innerText = item.bidderName;
      bidderName.href = `../../profile?user=${item.bidderName}`;
      let bidderAmount = document.createElement("span");
      bidderAmount.innerText = `${item.amount}`;
      listItem.append(bidderName, bidderAmount);
      bidsList.append(listItem);
    });
    return bidsList;
  }
  getBidInformation();
}

export function renderSingleCard(item, container) {
  return new Promise((resolve) => {
    if (!item.media[0]) {
      updateCardWithMedia(
        item,
        "https://fakeimg.pl/500x400/ffffff/ababab?text=No+Image+Found",
        container
      );
      resolve();
    } else {
      isValidImageSrc(item.media[0], (isValid) => {
        let media;
        if (isValid) {
          media = item.media[0];
        } else {
          media = "https://fakeimg.pl/500x400/ffffff/ababab?text=Invalid+Image";
        }
        updateCardWithMedia(item, media, container);
        resolve();
      });
    }
  });
}
