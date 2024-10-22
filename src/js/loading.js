const btnGerarDoc = document.querySelector(".btn-gerar-doc");
const loadingDialogElement = document.querySelector("dialog#loading");
const inputGerarList = document.querySelector("#btn-gerar-lista");

btnGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

inputGerarList.addEventListener("click", async () => {
    loadingDialogElement.showModal();
    try {
        const compileResponse = await window.api.compileJavaFile('readXML', 'Main.java');
        console.log(compileResponse === "" ? "código compilado com sucesso!" : null);
        const executeResponse = await window.api.executeJavaClass('readXML', 'readXML.Main');
        console.log(executeResponse);
    } catch (error) {
        console.error(error);
    } finally {
        console.log("processo finalizado")
        loadingDialogElement.close();
    }
});