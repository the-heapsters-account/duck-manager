const btnGerarDoc = document.querySelector(".btn-gerar-doc");
const loadingDialogElement = document.querySelector("dialog#criar-lista-pedidos");
const inputGerarList = document.querySelector("#btn-gerar-lista");

btnGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

inputGerarList.addEventListener("click", async () => {
    loadingDialogElement.showModal();
    inputGerarList.setAttribute('disabled', '');

    try {
        const prepareEntriesInfos = {
            dir: "createXML",
            files: "*.java",
            classes: {
                main: "CreateXML",
                formatter: "MakeXMLFormatter"
            }
        };
        const quantidadeMinima = await window.api.getQuantidadeMinima();
        const compilesResponse = await window.api.compileJavaFile(prepareEntriesInfos.dir, prepareEntriesInfos.files);
        const compilesResponseVerify = compilesResponse === '';
                }
            }
        } else {
            console.error("Erro na compilação do código.");
        }
    } catch(error) {
        handleError(error, "Não foi possível gerar a lista de pedidos: ");
    } finally {
        closeDialog();
    }
});

function createArgsObject() {
    return {
        fileName: '"file-destiny"',
        attributesNames: {
            db: null,
            spreadsheet: null
        },
        attributesValues: {
            db: null,
            spreadsheet: null
        },
        columnsImportants: {
            columnProduct: null,
            columnQuantity: null
        }
    };
}

function setArgs(argsObj, getInfos) {
    argsObj.attributesNames.db = `"${getInfos.dbColumns.dbColumnsNamesPresentation}"`;
    argsObj.attributesValues.db = `"${getInfos.dbColumns.dbColumnsNames.join(",")}"`;

    argsObj.attributesNames.spreadsheet = `"${getInfos.spreadsheetInfos.namesInfo.join(",")}"`;
    argsObj.attributesValues.spreadsheet = `"${getInfos.spreadsheetInfos.namesInfoPresentation}"`;

    argsObj.columnsImportants.columnProduct = `"${getInfos.columnsImportants.columnProduct}"`;
    argsObj.columnsImportants.columnQuantity = `"${getInfos.columnsImportants.columnQuantity}"`;
}

function createArgs(argsObj, row) {
    const argsItemsDB = `${argsObj.attributesNames.db} ${argsObj.attributesValues.db}`;
    const argsSInfoSpreadsheet = `${argsObj.attributesNames.spreadsheet.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(' ', '-')} ${argsObj.attributesValues.spreadsheet}`;

    return `"${argsObj.fileName}" ${argsItemsDB} "${row}" ${argsSInfoSpreadsheet}`;
}

function handleError(error, message) {
    alert(`${message} ${error.message}`);
    console.error(`${message} `, error);
}

function closeDialog() {
    loadingDialogElement.close();
    btnGerarDoc.removeAttribute("disabled");
    inputGerarList.removeAttribute("disabled");
}

async function prepareEntries(args, dir, file, className) {
    try {
        const compileResponse = await window.api.compileJavaFile(dir, file);
        const compileResponseVerify = compileResponse === '';
        if(compileResponseVerify) console.log("Código compilado com sucesso!");

        if(compileResponseVerify) {
            const executeResponse = await window.api.executeJavaClass(dir, `${className} ${args}`);
            console.log(executeResponse);
        }
    } catch (error) {
        alert('Erro durante compilação/execução: ' + error.message);
        console.error('Erro durante compilação/execução: ', error);
    }
}