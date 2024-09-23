// imports importantes
const fs = require('fs');
const errorMsg = require('./errorMessage');

function readJSON(path) {
    // método de leitura de arquivo
    fs.readFile(path, 'utf-8', (error, data) => {
    errorMsg.logMessage("não foi possível ler o arquivo. erro: " + error,
        "leitura do arquivo realizada com sucesso!",
        error);

        const jsonData = JSON.parse(data); // conversão de string para um objeto

        return jsonData;
    })
}

const jsonData = readJSON('../json/settings.json');

console.log(jsonData);

const quantidadeMinima = jsonData.quantidadeMinima;
const pathImageCopied = jsonData.pathImageCopied;
const atalhos = jsonData.atalhos;
    const pesquisa = atalhos.pesquisa;
    const menu = atalhos.menu;
const atalhosNaoPodem = jsonData.atalhosNaoPodem;
    const exemplo = atalhosNaoPodem.exemplo;
    const outroExemplo = atalhosNaoPodem.outroExemplo;
    const atalhosDefinidos = atalhosNaoPodem.atalhosDefinidos;
        const pesquisaAtalho = atalhosDefinidos.pesquisaAtalho;
        const menuAtalho = atalhosDefinidos.menuAtalho;

console.log("quantidade mínima: " + quantidadeMinima);
console.log("path image copied: " + pathImageCopied);
console.log("atalhos: " + atalhos);
    console.log("pesquisa: " + pesquisa);
    console.log("menu: " + menu);
console.log("atalhos que não podem:" + atalhosNaoPodem);
    console.log("exemplo: " + exemplo);
    console.log("outro exemplo: " + outroExemplo);
    console.log("atalhos definidos : " + atalhosDefinidos);
        console.log("atalho pesquisa: " + pesquisaAtalho);
        console.log("atalho menu: " + menuAtalho);