const continueAsGuest = document.getElementById("guestbutton");
continueAsGuest.addEventListener("click", (e) => {
  localStorage.setItem("status", "guest");
});
