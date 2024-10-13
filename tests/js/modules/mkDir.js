const fs = require('fs');
module.exports = { mkDir }

function mkDir(nameDir) {
    // método de criação de diretório
    fs.mkdir(nameDir, {recursive: true}, (error) => console.error(error));
}