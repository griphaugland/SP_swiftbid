import { SingleListingFetchFromURL } from "../singleListing.mjs";
import getLocalStorageData from "./localStorage.mjs";
import updateLocalStorage from "./updateLocalStorage.mjs";
import renderNav from "./handleLoggedIn.mjs";
export default async function placeBid(id, value, token) {
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}/bids`;
  const name = getLocalStorageData("name");
  const bid = {
    amount: Number(value),
  };
  const res = await fetch(url, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bid),
  });
  const data = await res.json();
  updateLocalStorage(name, token);
  SingleListingFetchFromURL();
  renderNav();
}
