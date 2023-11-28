export default function getLocalStorageData(value) {
  const data = localStorage.getItem("profile");
  const parsedData = JSON.parse(data);
  if (value === "all") {
    return parsedData;
  }
  if (value === "credits") {
    return parsedData.credits;
  }
  if (value === "avatar") {
    return parsedData.avatar;
  }
  if (value === "email") {
    return parsedData.email;
  }
  if (value === "name") {
    return parsedData.name;
  }
  if (value === "accessToken") {
    return parsedData.accessToken;
  }
}
