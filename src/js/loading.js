const shell = require('shelljs');
// const btGerarDoc = document.querySelector(".btn-gerar-doc");
// const loadingDialogElement = document.querySelector("dialog#loading");
// const inputGerarList = document.querySelector("#btn-gerar-lista");

// btGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

// inputGerarList.addEventListener("click", () => {
    shell.cd('../');
    shell.cd('java/');
    shell.exec('javac -d bin createXML/Main.java');
    shell.exec('java -cp bin createXML.Main');
// });