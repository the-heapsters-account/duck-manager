const settingsDialogElement = document.querySelector("dialog#settings");
const btnSettings = document.querySelector("header .btn-settings");
const btnClose = document.querySelector("dialog .btn-close");
const configsDB = document.querySelector("#db-settings");
const configsDBColumns = document.querySelector("#db-settings-columns");
const configsSpreadsheetInfos = document.querySelector("#spreadsheet-infos");
const quantidadeMinimaInput = document.querySelector("#input-quantidade-minima");
const tableSelected = document.querySelector("#input-table-selected");
const columnQuantitySelected = document.querySelector("#input-column-quantity");

btnSettings.addEventListener("click", () => {
    settingsDialogElement.showModal();

    window.api.getConfigs().then(settings => {
        quantidadeMinimaInput.value = settings.quantidade_minima;
        tableSelected.value = settings.db_configs.table_selected;
        columnQuantitySelected.value = settings.columns_importants.column_quantity;
        configsDB.innerHTML = "";
        configsDBColumns.innerHTML = "";
        configsSpreadsheetInfos.innerHTML = "";

        for(const [dbConfigKey, dbConfigValue] of Object.entries(settings.db_configs.connection)) {
            const li = document.createElement("li");
            const label = document.createElement("label");
            const input = document.createElement("input");
            const idName = dbConfigKey + "-input";

            label.setAttribute("for", idName);
            label.textContent = dbConfigKey;

            dbConfigKey === "password" ? input.setAttribute("type", "password") : input.setAttribute("type", "text");
            input.setAttribute("minlength", "1");
            input.setAttribute("maxlength", "50");
            dbConfigKey !== "password" ? input.setAttribute("required", "") : null;
            input.setAttribute("value", dbConfigValue);
            input.id = idName;

            li.appendChild(label);
            li.appendChild(input);

            configsDB.appendChild(li);
        }

        for(const [columnNamePresentation, columnName] of Object.entries(settings.db_columns)) {
            const li = document.createElement("li");
            const inputColumnNamePresentation = document.createElement("input");
            const inputColumnName = document.createElement("input");

            inputColumnNamePresentation.setAttribute("type", "text");
            inputColumnNamePresentation.setAttribute("minlength", "1");
            inputColumnNamePresentation.setAttribute("maxlength", "50");
            inputColumnNamePresentation.setAttribute("placeholder", "nome de apresentação");
            inputColumnNamePresentation.setAttribute("value", columnNamePresentation);

            inputColumnName.setAttribute("type", "text");
            inputColumnName.setAttribute("minlength", "1");
            inputColumnName.setAttribute("maxlength", "50");
            inputColumnName.setAttribute("placeholder", "nome da coluna no banco de dados");
            inputColumnName.setAttribute("value", columnName);

            li.appendChild(inputColumnNamePresentation);
            li.appendChild(inputColumnName);

            configsDBColumns.appendChild(li);
        }

        let li = document.createElement("li");
        let inputAddColumn = document.createElement("input");
        inputAddColumn.setAttribute("type", "button");
        inputAddColumn.setAttribute("onclick", "addNewInputColumnDB('#db-settings-columns', 0)");
        inputAddColumn.value = "+";
        inputAddColumn.classList.add("add-new-input-column-db");

        li.appendChild(inputAddColumn);
        configsDBColumns.appendChild(li);

        for(const [spreadsheetInfo, spreadsheetInfoValue] of Object.entries(settings.spreadsheet_infos)) {
            const li = document.createElement("li");
            const inputSpreadsheetInfo = document.createElement("input");
            const inputSpreadsheetInfoValue = document.createElement("input");

            inputSpreadsheetInfo.setAttribute("type", "text");
            inputSpreadsheetInfo.setAttribute("minlength", "1");
            inputSpreadsheetInfo.setAttribute("maxlength", "50");
            inputSpreadsheetInfo.setAttribute("required", "");
            inputSpreadsheetInfo.setAttribute("value", spreadsheetInfo);

            inputSpreadsheetInfoValue.setAttribute("type", "text");
            inputSpreadsheetInfoValue.setAttribute("minlength", "1");
            inputSpreadsheetInfoValue.setAttribute("maxlength", "50");
            inputSpreadsheetInfoValue.setAttribute("required", "");
            inputSpreadsheetInfoValue.setAttribute("value", spreadsheetInfoValue);

            li.appendChild(inputSpreadsheetInfo);
            li.appendChild(inputSpreadsheetInfoValue);

            configsSpreadsheetInfos.appendChild(li);
        }

        li = document.createElement("li");
        inputAddColumn = document.createElement("input");
        inputAddColumn.setAttribute("type", "button");
        inputAddColumn.setAttribute("onclick", "addNewInputColumnDB('#spreadsheet-infos', 1)");
        inputAddColumn.value = "+";
        inputAddColumn.classList.add("add-new-input-column-db");

        li.appendChild(inputAddColumn);
        configsSpreadsheetInfos.appendChild(li);
    }).catch((error) => console.error(error));
});

btnClose.addEventListener("click", () => settingsDialogElement.close());