import fetchContent from "./fetchContent.mjs";
import { renderCard } from "./renderCard.mjs";
export async function renderCategories() {
  const endingSoon = await fetchContent("getAllActive");
  const Popular = await fetchContent("getAllActiveDesc");
  const slicedEndingSoon = endingSoon.slice(0, 4);
  const slicedPopular = Popular.slice(0, 4);
  console.log(Popular);
  const category1 = document.getElementById("card-container-category1");
  const category2 = document.getElementById("card-container-category2");
  console.log("running");
  if (slicedPopular && slicedEndingSoon) {
    // Clear previous content
    category1.innerHTML = "";
    category2.innerHTML = "";
    slicedEndingSoon.forEach((item) => {
      category1.appendChild(renderCard(item));
    });
    slicedPopular.forEach((item) => {
      category2.appendChild(renderCard(item));
    });
  }
}
