// imports importantes
const fs = require('fs'); // pacote padrão node (file-system)
const errorMsg = require('./errorMessage'); // módulo de log de mensagem de erro

// função de criação de diretório
function mkDir(nameDir) {
    // método de criação de diretório
    fs.mkdir(nameDir, {recursive: true}, (error) => {
        errorMsg.logMessage("não foi possível criar o diretório. erro: " + error,
        `diretório "${nameDir}" criado com sucesso!`,
        error);
    });
}
// função de deleção de diretório
function rmDir(nameDir) {
    // método de deleção de diretório
    fs.rm(nameDir, {recursive: true, force: true}, (error) => {
        errorMsg.logMessage("não foi possível deletar o diretório. erro: " + error,
        `diretório "${nameDir}" apagado com sucesso!`,
        error);
    });
}

const nameDir = "diretório de teste";

mkDir(nameDir);

let seconds = 5;

// temporizador
const stopwatch = setInterval(() => {
    console.log(`o diretório "${nameDir}" será deletado em ${seconds}...`);

    seconds--;

    if(seconds < 1) {
        clearInterval(stopwatch);

        rmDir(nameDir);
    }
}, 1000);