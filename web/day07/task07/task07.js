const messageBox = document.querySelector(".exercice footer div");
const acceptLink = messageBox.querySelector("a");
const footer = messageBox.parentElement;
const cookieName = "acceptsCookies";
let deleteBox = footer.querySelector(".cookie-settings");

if (!deleteBox) {
  deleteBox = document.createElement("div");
  deleteBox.className = "cookie-settings";
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete the cookie";
  deleteBox.append(deleteButton);
  footer.append(deleteBox);
}

function hasAcceptedCookies() {
  return document.cookie.split("; ").some((cookie) => cookie === `${cookieName}=true`);
}

function updateMessage() {
  const accepted = hasAcceptedCookies();
  messageBox.hidden = accepted;
  deleteBox.hidden = !accepted;
}

acceptLink.addEventListener("click", (event) => {
  event.preventDefault();
  document.cookie = `${cookieName}=true; max-age=86400; path=/; SameSite=Lax`;
  updateMessage();
});

deleteBox.querySelector("button").addEventListener("click", () => {
  document.cookie = `${cookieName}=; max-age=0; path=/; SameSite=Lax`;
  updateMessage();
});

updateMessage();
