const btnGerarDoc = document.querySelector(".btn-gerar-doc");
const loadingDialogElement = document.querySelector("dialog#create-wish-list");
const inputGerarList = document.querySelector("#btn-gerar-lista");
const loading = document.querySelector("#loading");
const msg = document.querySelector("#msg");

let ellipsisInterval;

btnGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

inputGerarList.addEventListener("click", async () => {
    loadingDialogElement.showModal();
    inputGerarList.setAttribute('disabled', '');
    loading.style.display = "block";
    msg.style.display = "block";
    startLoadingAnimation();

    try {
        const classesExecute = await window.api.getInfosClassesExecute();
        const createXML = classesExecute.createXML;
        const createParamsSpreadsheet = classesExecute.createParamsSpreadsheet;
        const createSpreadsheet = classesExecute.createSpreadsheet;

        const quantidadeMinima = await window.api.getQuantidadeMinima();
        const compilesResponse = await window.api.compileJavaFile();
        const table = await window.api.getTableDB();
        const columnsObject = await window.api.getColumnsDB();
        const columnQuantity = await window.api.getNameColumnQuantity();

        const argsObj = createArgsObject();
        argsObj.fileName = "file_destiny";
        const getInfos = await window.api.getInfosListaPedidos();

        const query = `SELECT ${columnsObject.columnsDB.toString().replace(`${columnQuantity},`, '')}  FROM ${table} WHERE ${columnQuantity} <= ${quantidadeMinima}`;
        const rows = await window.api.executeQuery(query);

        setArgs(argsObj, getInfos);
        try {
            for(const row of rows) {
                const rowItems = Object.values(row).toString().trimStart().trimEnd();

                const packageName = createXML.package_name;
                const className = createXML.class_name;
                const args = createXML.args = createArgs(argsObj, rowItems);

                console.log(args);

                const executeResponse = await window.api.executeJavaClass(packageName, className, args);
            }
        } catch(error) {
            await window.api.deleteFiles();
            handleError("Erro durante a execução da linha: ", error);
        }

        try {
            const packageName = createParamsSpreadsheet.package_name;
            const className = createParamsSpreadsheet.class_name;
            const arg = createParamsSpreadsheet.arg;

            // const readResponse = await window.api.executeJavaClass(packageName, className, arg);
            const readResponse = await window.api.executeJavaClass(packageName, className, arg);
        } catch(error) {
            await window.api.deleteFiles();
            handleError("Erro durante na criação de parâmetros: ", error);
        }

        // try {
        //     const packageName = formatXML.package_name;
        //     const className = formatXML.class_name;
        //     const arg = formatXML.arg;

        //     const formatResponse = await window.api.executeJavaClass(packageName, className, arg);
        //     console.log(formatResponse);
        // } catch(error) {
        //     handleError("Erro durante a formatação do documento: ", error);
        // }

        try {
            const packageName = createSpreadsheet.package_name;
            const className = createSpreadsheet.class_name;
            const date = getDateToday();
            const hour = getHour();
            const nameFile = `lista-de-pedidos-${date}-${hour}`;

            const createSpreadsheetResponse = await window.api.executeJavaClass(packageName, className, nameFile);
            console.log(createSpreadsheetResponse);

            if(createSpreadsheetResponse.search("SUCCESS")) {
                alert("Lista de pedidos criada com sucesso!");
                const responseDel = await window.api.deleteFiles();
                const responseMove = await window.api.moveFile(nameFile + ".xls");

                console.log(responseDel);
                console.log(responseMove);
            }
        } catch(error) {
            await window.api.deleteFiles();
            handleError("Não foi possível finalizar o processo de criação da planilha: ", error);
        }
    } catch(error) {
        await window.api.deleteFiles();
        handleError("Não foi possível gerar a lista de pedidos: ", error);
    } finally {
        closeDialog();
        msg.style.display = "none";
        stopLoadingAnimation();
    }
});

function createArgsObject() {
    return {
        fileName: '"file_destiny"',
        attributesNames: {
            db: null,
            spreadsheet: null
        },
        attributesValues: {
            db: null,
            spreadsheet: null
        },
    };
}

function setArgs(argsObj, getInfos) {
    argsObj.attributesNames.db = getInfos.dbColumns.dbColumnsNamesPresentation;
    argsObj.attributesValues.db = getInfos.dbColumns.dbColumnsNames.join(",");

    argsObj.attributesNames.spreadsheet = getInfos.spreadsheetInfos.namesInfo.join(",");
    argsObj.attributesValues.spreadsheet = getInfos.spreadsheetInfos.namesInfoPresentation;
}

function createArgs(argsObj, row) {
    const argsItemsDB = argsObj.attributesValues.db.toString().replaceAll(' ', '_');
    const argsInfoSpreadsheet = `${argsObj.attributesNames.spreadsheet.toString().replaceAll(' ', '_')} ${argsObj.attributesValues.spreadsheet.toString().replaceAll(' ', '_')}`;

    return `${argsObj.fileName} ${argsItemsDB} ${row.toString().replaceAll("|", " ").replaceAll(" ", "_")} ${argsInfoSpreadsheet}`;
}

function handleError(message, error) {
    alert(`${message} ${error.message}`);
    console.error(`${message} `, error);
}

function closeDialog() {
    loadingDialogElement.close();
    btnGerarDoc.removeAttribute("disabled");
    inputGerarList.removeAttribute("disabled");
}

function startLoadingAnimation() {
    const ellipsis = document.getElementById("ellipsis");
    let dots = 0;

    ellipsisInterval = setInterval(() => {
        ellipsis.innerHTML = '.'.repeat(dots);
        dots = (dots + 1) % 4;
    }, 500);
}

function stopLoadingAnimation() {
    clearInterval(ellipsisInterval);
    document.getElementById("ellipsis").innerHTML = '';
}

function getDateToday() {
    const dateToday = new Date();

    const day = String(dateToday.getDate()).padStart(2, '0');
    const month = String(dateToday.getMonth() + 1).padStart(2, '0');
    const year = dateToday.getFullYear();

    const dateFormatted = `${day}_${month}_${year}`;

    return dateFormatted;
}

function getHour() {
    const dateToday = new Date();

    const hours = dateToday.getHours();
    const minutes = dateToday.getMinutes();
    const seconds = dateToday.getSeconds();

    return `${hours}_${minutes}_${seconds}`;
}