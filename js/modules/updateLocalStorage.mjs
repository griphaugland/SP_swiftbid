export default async function updateLocalStorage(name, token) {
  const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}`;
  const res = await fetch(url, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  let previousValues = JSON.parse(localStorage.getItem("profile"));
  previousValues.credits = data.credits;
  previousValues.avatar = data.avatar;
  localStorage.setItem("profile", JSON.stringify(previousValues));
}
