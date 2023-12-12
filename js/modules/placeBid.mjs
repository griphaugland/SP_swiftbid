import { SingleListingFetchFromURL } from "../singleListing.mjs";
export default async function placeBid(id, value, token) {
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}/bids`;
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
  console.log(res);
  const data = await res.json();
  SingleListingFetchFromURL();
}
