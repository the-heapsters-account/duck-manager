const btnGerarDoc = document.querySelector(".btn-gerar-doc");
const loadingDialogElement = document.querySelector("dialog#criar-lista-pedidos");
const inputGerarList = document.querySelector("#btn-gerar-lista");

btnGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

inputGerarList.addEventListener("click", async () => {
    loadingDialogElement.showModal();

    try {
        const arrays = [];
        const prepareEntriesInfos = {
            dir: "test",
            files: {
                files: "*.java",
                dataEntry: "DataEntry.java"
            },
            class: "Main"
        };
        const quantidadeMinima = await window.api.getQuantidadeMinima();
        const compilesResponse = await window.api.compileJavaFile(prepareEntriesInfos.dir, prepareEntriesInfos.files.files);
        const compilesResponseVerify = compilesResponse === '';
        btnGerarDoc.setAttribute('disabled', '');
        inputGerarList.setAttribute('disabled', '');

        console.log("gerando lista de pedidos...");

        if(compileResponseMain === "" && compileResponseDataEntry === "") {
            const table = await window.api.getTableDB();
            const columnsObject = await window.api.getColumnsDB();
            const query = `SELECT ${columnsObject.columnsDB} FROM ${table}`;
            const rows = await window.api.executeQuery(query);

            console.log('código compilado...');

            rows.forEach(row => {
                if(row.estoque <= quantidadeMinima) {
                    const arrayToAdd = []

                    for(const column of columnsObject.columnsDB) arrayToAdd.push(row[column]);

                    arrays.push([`"${arrayToAdd.toString()}"`]);
                }
            });

            await prepareEntries(arrays, prepareEntriesInfos.dir, prepareEntriesInfos.files.main, prepareEntriesInfos.class);
        } else {
            console.error("Erro na compilação do código.");
        }
    } catch(error) {
        loadingDialogElement.close();

        alert("Não foi possível gerar a lista de pedidos.\n" + error);
        console.error("Não foi possível gerar a lista de pedidos: ", error);

        btnGerarDoc.removeAttribute('disabled');
        inputGerarList.removeAttribute('disabled');
    } finally {
        loadingDialogElement.close();

        btnGerarDoc.removeAttribute("disabled");
        inputGerarList.removeAttribute("disabled");
    }
});

async function prepareEntries(arrays, dir, file, className) {
    for(const array of arrays) {
        try {
            const compileResponse = await window.api.compileJavaFile(dir, file);

            if(compileResponse === "") {
                console.log("Código compilado com sucesso!");

                window.api.executeJavaClass(dir, `${className} ${array.join(', ')}`).then(executeResponse => console.log(executeResponse));
            }
        } catch(error) {
            alert('Erro durante compilação/execução:', error);
            console.error('Erro durante compilação/execução:', error);
        }
    }
}