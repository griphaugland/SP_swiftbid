import fetchContent from "./fetchContent.mjs";

export default async function createWinsCards(winsArray) {
  const promises = winsArray.map((item) => fetchContent("getSingle", item));
  const newArr = await Promise.all(promises);
  const finalArr = newArr.filter((item) => !item.errors);
  if (finalArr.length < newArr.length) {
    console.log(
      newArr.length - finalArr.length,
      "fetching errors found, filtered away"
    );
  }
  return finalArr;
}
