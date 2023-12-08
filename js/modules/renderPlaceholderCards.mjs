export default function renderPlaceholderCards() {
  const hand = "../../media/hand-sparkles-solid.svg";
  const container = document.getElementById("card-container");
  const placeholderArr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  placeholderArr.forEach(() => {
    const card = document.createElement("div");
    card.className = "card-listing";
    card.innerHTML = `
        <div class="card-top-bar-placeholder">
        </div>
        <div class="card-image-container placeholder-image">
            <div class="spinner-container w-100 d-flex align-items-center justify-content-center h-25">
            <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
            </div>
      </div>
        </div>
        <div class="card-text-container-placeholder">
          <div class="title-price-container">
            <h3></h3>
            <p></p>
          </div>
          <a id="card-bid-button" class="" href="#"><img src="${hand}" height="35px" width="55px" alt="Hand icon" /></a>
        </div>
      `;
    container.appendChild(card);
  });
}

export function renderPlaceholderCardsCategories(id) {
  const hand = "../../media/hand-sparkles-solid.svg";
  const container = document.getElementById(`${id}`);
  const placeholderArr = [0, 1, 2, 3];
  placeholderArr.forEach(() => {
    const card = document.createElement("div");
    card.className = "card-listing";
    card.innerHTML = `
        <div class="card-top-bar-placeholder">
        </div>
        <div class="card-image-container placeholder-image">
            <div class="spinner-container w-100 d-flex align-items-center justify-content-center h-25">
            <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
            </div>
        </div>
        <div class="card-text-container-placeholder">
          <div class="title-price-container">
            <h3></h3>
            <p></p>
          </div>
          <a id="card-bid-button" class="" href="#"><img src="${hand}" height="35px" width="55px" alt="Hand icon" /></a>
        </div>
      `;
    container.appendChild(card);
  });
}
