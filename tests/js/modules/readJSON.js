const fs = require("fs");
module.exports = {
    readJSON
};

function readJSON(path) {
    // método de leitura de arquivo
    const data = fs.readFileSync(path, "utf-8");

    const jsonData = JSON.parse(data); // conversão de string para um objeto
    return jsonData;
}