const dialogElement = document.querySelector("dialog");
const btnSettings = document.querySelector("header .btn-settings");
const btnClose = document.querySelector("dialog .btn-close");
const configsDB = document.querySelector("#db-configs");
const configsDBColumns = document.querySelector("#db-configs-columns");
const themesPresentation = document.querySelector("#themes-presentation");
const inputQuantidadeMinima = document.querySelector("#input-quantidade-minima");
const filePathDisplay = document.querySelector("#file-path-display");
const inputPathCopied = document.querySelector("#input-path-copied");

// btSettings.addEventListener("click", dialogElement.showModal());
btSettings.addEventListener("click", () => dialogElement.showModal());
btClose.addEventListener("click", () => dialogElement.close());