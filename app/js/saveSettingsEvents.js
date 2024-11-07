const buttonSave = document.querySelector(".btn-save");
const settingsDBColumns = document.querySelector("#db-settings-columns");
const settingsSpreadsheetInfos = document.querySelector("#spreadsheet-infos");
const dialogElement = document.querySelector("dialog#settings");

buttonSave.addEventListener("click", () => {
    const hostInput = document.querySelector("#host-input");
    const userInput = document.querySelector("#user-input");
    const passwordInput = document.querySelector("#password-input");
    const databaseInput = document.querySelector("#database-input");
    const tableSelectedInput = document.querySelector("#input-table-selected");
    const quantidadeMninimaInput = document.querySelector("#input-quantidade-minima");

    const settings = {
        quantidade_minima: quantidadeMninimaInput.value,
        atalhos: {
            produtos: "F1",
            "lista de pedidos": "F2",
            pesquisa: "CTRL + i",
            menu: "CTRL + ,"
        },
        db_configs: {
            connection: {
                host: hostInput.value,
                user: userInput.value,
                password: passwordInput.value,
                database: databaseInput.value,
            },
            table_selected: tableSelectedInput.value,
        },
        db_columns: {
            // adição dinâmica
        },
        spreadsheet_infos: {
            // adição dinâmica
        }
    };

    for(const inputColumn of configsDBColumns.children) {
        const columnName = inputColumn.children[0].value;
        const columnNameDB = inputColumn.children[1].value;

        settings.db_columns[columnName] = columnNameDB;
    }

    window.api.saveConfigs(settings).then((response) => {
        if (response.status === "success") {
            alert("Configurações salvas com sucesso!");

            dialogElement.close();
        } else {
            alert("Não foi possível salvar as configurações");
        }
    }).catch((error) => console.error("Erro ao salvar o arquivo JSON: " + error));
});