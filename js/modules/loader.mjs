export function startLoading(elementID) {
  console.log(elementID);
  const button = document.getElementById(elementID);
  button.innerHTML = "";
  button.innerHTML = `
    <div class="spinner-container w-100 d-flex align-items-center justify-content-center h-25">
      <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
    </div>`;
}
export function stopLoading(elementID) {
  const button = document.getElementById(elementID);
  button.innerHTML = "";
  button.innerHTML = elementID.toUpperCase();
}
