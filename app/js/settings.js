const settingsDialogElement = document.querySelector("dialog#settings");
const btnSettings = document.querySelector("header .btn-settings");
const btnClose = document.querySelector("dialog .btn-close");
const configsDB = document.querySelector("#db-configs");
const configsDBColumns = document.querySelector("#db-configs-columns");
const configsSpreadsheetInfos = document.querySelector("#spreadsheet-infos");
const inputquantidade_minima = document.querySelector("#input-quantidade-minima");

btnSettings.addEventListener("click", () => {
    window.api.getConfigs().then(settings => {
        inputquantidade_minima.value = settings.quantidade_minima;
        configsDB.innerHTML = "";
        configsDBColumns.innerHTML = "";
        configsSpreadsheetInfos.innerHTML = "";

        for(const [dbConfigKey, dbConfigValue] of Object.entries(settings.db_configs)) {
            const li = document.createElement("li");
            const label = document.createElement("label");
            const input = document.createElement("input");
            const idName = dbConfigKey + "-input";

            label.setAttribute("for", idName);
            label.textContent = dbConfigKey;

            input.setAttribute("type", "text");
            input.setAttribute("minlength", "1");
            input.setAttribute("maxlength", "50");
            input.id = idName;
            input.value = dbConfigValue;

            li.appendChild(label);
            li.appendChild(input);

            configsDB.appendChild(li);
        }

        for(const [columnNamePresentation, columnName] of Object.entries(settings.dbColumns)) {
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

            configsDBColumns.appendChild(li);
        }

        for(const [spreadsheetInfo, spreadsheetInfoValue] of Object.entries(settings.spreadsheet_infos)) {
            const li = document.createElement("li");
            const inputSpreadsheetInfo = document.createElement("input");
            const inputSpreadsheetInfoValue = document.createElement("input");

            inputSpreadsheetInfo.setAttribute("type", "text");
            inputSpreadsheetInfo.setAttribute("minlength", "1");
            inputSpreadsheetInfo.setAttribute("maxlength", "50");
            inputSpreadsheetInfo.value = spreadsheetInfo;

            inputSpreadsheetInfoValue.setAttribute("type", "text");
            inputSpreadsheetInfoValue.setAttribute("minlength", "1");
            inputSpreadsheetInfoValue.setAttribute("maxlength", "50");
            inputSpreadsheetInfoValue.value = spreadsheetInfoValue;

            li.appendChild(inputSpreadsheetInfo);
            li.appendChild(inputSpreadsheetInfoValue);

            configsSpreadsheetInfos.appendChild(li);
        }
    }).catch((error) => console.error(error));

    settingsDialogElement.showModal();
});

btnClose.addEventListener("click", () => settingsDialogElement.close());