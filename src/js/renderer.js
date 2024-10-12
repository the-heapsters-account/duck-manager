const inputQuantidadeMinima = document.querySelector("#inputQuantidadeMinima");
const inputPathCopied = document.querySelector("#input-path-copied");
const atalhosList = document.querySelector("#db-configs");
const filePathDisplay = document.querySelector("#file-path-display");
const buttonSave = document.querySelector(".bt-save");

window.api.readJSON().then((settingsJSON) => {
    inputQuantidadeMinima.value = settingsJSON.quantidadeMinima;
    filePathDisplay.textContent = settingsJSON.pathImageCopied;
    inputPathCopied.value = "";
    atalhosList.innerHTML = "";

    for (const [key, value] of Object.entries(settingsJSON.atalhos)) {
    for (const [dbConfigKey, dbConfigValue] of Object.entries(settingsJSON.dbConfigs)) {
        const li = document.createElement("li");

        li.textContent = `${key}: ${value}`;
        li.textContent = `${dbConfigKey}:${dbConfigValue}`;

        atalhosList.appendChild(li);
    }
}).catch((error) => console.error("Erro ao ler o arquivo JSON: " + error));

buttonSave.addEventListener("click", () => {
    const settings = {
        quantidadeMinima: inputQuantidadeMinima.value,
        pathImageCopied: inputPathCopied.files[0]?.path || filePathDisplay.textContent, // usa o novo arquivo ou mantém o antigo
        atalhos: {}
    };

    for (const li of atalhosList.children) {
        const [key, value] = li.textContent.split(": ");
        settings.atalhos[key] = value;
    }

    window.api.saveJSON(settings).then((response) => {
        if (response.status === "success") {
            alert("Configurações salvas com sucesso!");

            dialogElement.close();
        } else {
            alert("Não foi possível salvar as configurações");
        }
    }).catch((error) => console.error("Erro ao salvar o arquivo JSON: " + error));
});