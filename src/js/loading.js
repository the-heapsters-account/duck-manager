const btnGerarDoc = document.querySelector(".btn-gerar-doc");
const loadingDialogElement = document.querySelector("dialog#loading");
const inputGerarList = document.querySelector("#btn-gerar-lista");

btnGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

inputGerarList.addEventListener("click", async () => {
    window.api.compileJavaFile(null, 'createXML', 'Main.java').then(response => console.log(response));
    window.api.executeJavaClass(null, 'createXML', 'createXML.Main').then(response => console.log(response));
});