const buttonSave = document.querySelector(".btn-save");
const settingsDBColumns = document.querySelector("#db-settings-columns");
const settingsSpreadsheetInfos = document.querySelector("#spreadsheet-infos");
const dialogElement = document.querySelector("dialog#settings");

buttonSave.addEventListener("click", () => {
    const hostInput = document.querySelector("#host-input");
    const userInput = document.querySelector("#user-input");
    const passwordInput = document.querySelector("#password-input");
    const databaseInput = document.querySelector("#database-input");
    const quantidadeMinimaInput = document.querySelector("#input-quantidade-minima");
    const tableSelectedInput = document.querySelector("#input-table-selected");

    const settings = {
        quantidade_minima: parseInt(quantidadeMinimaInput.value),
        atalhos: {
            produtos: "F1",
            "lista de pedidos": "F2",
            pesquisa: "CTRL + I",
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

    for(const inputsColumn of settingsDBColumns.children) {
        const columnNameVerify = inputsColumn.children[0].value !== "+" && inputsColumn.children[0].getAttribute("type") === "text";

        if(columnNameVerify) settings.db_columns[inputsColumn.children[0].value] = inputsColumn.children[1].value;
    }
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