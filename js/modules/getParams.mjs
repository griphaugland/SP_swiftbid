export default function getParameter(parameter) {
  let params = new URLSearchParams(window.location.search);
  const value = params.get(`${parameter}`);
  return value;
}
