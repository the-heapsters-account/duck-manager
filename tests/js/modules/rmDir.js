const fs = require('fs');
module.exports = {
    rmDir
}

function rmDir(nameDir) {
    // método de deleção de diretório
    fs.rm(nameDir, {recursive: true, force: true}, (error) => console.error(error));
}