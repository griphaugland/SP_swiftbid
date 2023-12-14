import fetchContent from "./fetchContent.mjs";

export default async function createWinsCards(winsArray) {
  let newArr = [];
  winsArray.forEach(async (item) => {
    newArr.push(await fetchContent("getSingle", item));
  });
  console.log(newArr);
  return newArr;
}
