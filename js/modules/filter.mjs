import fetchContent from "./fetchContent.mjs";
import { renderCard } from "./renderCard.mjs";
export async function renderCategories() {
  const endingSoon = await fetchContent("getAllActive");
  const Popular = await fetchContent("getAllActiveDesc");
  const slicedEndingSoon = endingSoon.slice(0, 4);
  const slicedPopular = Popular.slice(0, 4);
  const category1 = document.getElementById("card-container-category1");
  const category2 = document.getElementById("card-container-category2");
  if (slicedPopular && slicedEndingSoon) {
    category1.innerHTML = "";
    category2.innerHTML = "";

    for (const item of slicedEndingSoon) {
      await renderCard(item, category1);
    }
    for (const item of slicedPopular) {
      await renderCard(item, category2);
    }
  }
}
