const inputQuantidadeMinima = document.querySelector("#input-quantidade-minima");
const filePathDisplay = document.querySelector("#file-path-display");
const inputPathCopied = document.querySelector("#input-path-copied");
const configsDB = document.querySelector("#db-configs");
const buttonSave = document.querySelector(".bt-save");
const query = document.querySelector('#queryInput').value;

window.api.readJSON().then((settingsJSON) => {
    inputQuantidadeMinima.value = settingsJSON.quantidadeMinima;
    filePathDisplay.textContent = settingsJSON.pathImageCopied;
    inputPathCopied.value = "";
    configsDB.innerHTML = "";

    for (const [dbConfigKey, dbConfigValue] of Object.entries(settingsJSON.dbConfigs)) {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const input = document.createElement("input");

        label.setAttribute("for", dbConfigKey);
        label.textContent = dbConfigKey;

        input.setAttribute("type", "text");
        input.setAttribute("minlength", "1");
        input.setAttribute("maxlength", "50");
        input.id = dbConfigKey;
        input.value = dbConfigValue;

        li.appendChild(label);
        li.appendChild(input);

        configsDB.appendChild(li);
    }

    for (const [columnNamePresentation, columnName] of Object.entries(settingsJSON.dbColumns)) {
        const li = document.createElement("li");
        const inputColumnNamePresentation = document.createElement("input");
        const inputColumnName = document.createElement("input");

        inputColumnNamePresentation.setAttribute("type", "text");
        inputColumnNamePresentation.setAttribute("minlength", "1");
        inputColumnNamePresentation.setAttribute("maxlength", "50");
        inputColumnNamePresentation.value = columnNamePresentation;

        inputColumnName.setAttribute("type", "text");
        inputColumnName.setAttribute("minlength", "1");
        inputColumnName.setAttribute("maxlength", "50");
        inputColumnName.value = columnName;

        li.appendChild(inputColumnNamePresentation);
        li.appendChild(inputColumnName);

        configsDB.appendChild(li);
    }
}).catch((error) => console.error("erro ao ler o arquivo JSON: " + error));

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

document.getElementById('executeQueryButton').addEventListener('click', () => {
    console.log("conexão com o banco de dados inicializada com sucesso");

    window.api.executeQuery(query).then(data => {
            const queryResult = document.querySelector('#query-result');

            if(data == '') {
                queryResult.innerText = "coluna vazia ou não encontrada";
            } else {
                queryResult.innerHTML = JSON.stringify(data, null, 2);
            }

            console.log("query executada com sucesso");
        })
        .catch(error => console.error('erro ao executar query:', error))
        .finally(() => console.log("conexão finalizada com sucesso"));
});