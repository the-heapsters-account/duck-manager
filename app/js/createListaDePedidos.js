const btnGerarDoc = document.querySelector(".btn-gerar-doc");
const loadingDialogElement = document.querySelector("dialog#criar-lista-pedidos");
const inputGerarList = document.querySelector("#btn-gerar-lista");

btnGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

inputGerarList.addEventListener("click", async () => {
    loadingDialogElement.showModal();

    try {
        console.log("gerando lista de pedidos...");
        const compileResponse = await window.api.compileJavaFile('readXML', 'Main.java');
        console.log(compileResponse === "" ? "código compilado com sucesso!" : null);
        const executeResponse = await window.api.executeJavaClass('readXML', 'readXML.Main');
        console.log(executeResponse);
    } catch(error) {
        alert("Não foi possível gerar a lista de pedidos.\n" + error);
        console.error("Não foi possível gerar a lista de pedidos: ", error);
    } finally {
        loadingDialogElement.close();
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
        } catch (error) {
            alert('Erro durante compilação/execução:', error);
            console.error('Erro durante compilação/execução:', error);
        }
    }
}