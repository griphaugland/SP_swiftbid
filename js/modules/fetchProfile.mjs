import getLocalStorageData from "./localStorage.mjs";
export default async function fetchProfile(name) {
  const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}`;
  const token = getLocalStorageData("accessToken");
  const res = await fetch(url, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function getJoke() {
  const url = `https://api.noroff.dev/api/v1/jokes/random`;
  const res = await fetch(url, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
