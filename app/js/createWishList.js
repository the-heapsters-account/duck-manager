const btnGerarDoc = document.querySelector(".btn-gerar-doc");
const loadingDialogElement = document.querySelector("dialog#create-wish-list");
const inputGerarList = document.querySelector("#btn-gerar-lista");

btnGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

inputGerarList.addEventListener("click", async () => {
    loadingDialogElement.showModal();
    inputGerarList.setAttribute('disabled', '');

    try {
        const compileResponse = await window.api.compileJavaFile();
        const classesExecute = await window.api.getInfosClassesExecute();
        const createXML = classesExecute.createXML;
        const readXML = classesExecute.readXML;
        const createSpreadsheet = classesExecute.createSpreadsheet;

        const quantidadeMinima = await window.api.getQuantidadeMinima();
        const compilesResponse = await window.api.compileJavaFile();
        const compilesResponseVerify = compilesResponse === '';
        const table = await window.api.getTableDB();
        const columnsObject = await window.api.getColumnsDB();
        const columnQuantity = await window.api.getNameColumnQuantity();

        const argsObj = createArgsObject();
        argsObj.fileName = "file_destiny";
        const getInfos = await window.api.getInfosListaPedidos();

        const query = `SELECT ${columnsObject.columnsDB.toString().replace(`${columnQuantity},`, '')}  FROM ${table} WHERE ${columnQuantity} <= ${quantidadeMinima}`;
        const rows = await window.api.executeQuery(query);

        if(!compilesResponseVerify) throw new Error('Erro na compilação do código');
        console.log('Código compilado com sucesso!');

        setArgs(argsObj, getInfos);
        let i = 0;

            try {
                for(const row of rows) {
                    const rowItems = Object.values(row).toString().trimStart().trimEnd();
                    const args = createArgs(argsObj, rowItems);

                    const executeResponse = await window.api.executeJavaClass(classesExecute.main, args);
                    console.log(executeResponse);
                    i++;
                    console.log(`linha ${i} de ${rows.length}`);
                }
            } catch(error) {
                handleError(error, "Erro durante a execução da linha: ");
            }

        try {
            const formatterResponse = await window.api.executeJavaClass(classesExecute.formatter, argsObj.fileName);
            console.log(formatterResponse);
        } catch(error) {
            handleError(error, "Erro durante a formatação do documento: ");
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

async function prepareEntries(args, className) {
    try {
        const compileResponse = await window.api.compileJavaFile();
        if(compileResponse !== '') throw new Error('Erro na compilação do código');

        console.log("Código compilado com sucesso!");

        const executeResponse = await window.api.executeJavaClass(className, args);
        console.log(executeResponse);
    } catch(error) {
        handleError(error, 'Erro durante compilação/execução:');
    }
}