const dialogElement = document.querySelector("dialog");
const btSettings = document.querySelector(".bt-settings");
const btClose = document.querySelector("dialog .bt-close");
const btSave = document.querySelector("dialog .bt-save");

// btSettings.addEventListener("click", dialogElement.showModal());
btSettings.addEventListener("click", () => dialogElement.showModal());
btClose.addEventListener("click", () => dialogElement.close());
btSave.addEventListener("click", () => {
    // mudanças nas configurações
    dialogElement.close();
});