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