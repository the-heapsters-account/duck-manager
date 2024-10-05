import { readJSON } from './modules/readJSON.js';

const dialogSectionContent = document.querySelector("dialog .content");
const jsonSettings = readJSON('../settings/settings.json');

const jsonData= {
    quantidadeMinima: jsonSettings.quantidadeMinima,
    pathImageCopied: jsonSettings.pathImageCopied,
    atalhos: jsonSettings.atalhos,
    atalhosNaoPodem: jsonSettings.atalhosNaoPodem
};

const inputElements = {
    inputQuantidadeMinima: document.querySelector("#inputQuantidadeMinima"),
    pathImageCopied: document.querySelector("#inputPathCopied"),
    atalhos: document.querySelector("#atalhos")
};

console.log(jsonData);

// inputElements.inputQuantidadeMinima.value = jsonData.quantidadeMinima;
document.querySelector("#inputQuantidadeMinima").value = jsonData.quantidadeMinima;