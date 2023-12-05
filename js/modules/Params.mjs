export default function getParameter(value) {
  let params = new URL(document.location).searchParams;
  let searchValue = params.get(`${value}`);
  return searchValue;
}
