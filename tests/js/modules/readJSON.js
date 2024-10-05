const fs = require("fs");
module.exports = {
    readJSON
};

function readJSON(path) {
    const data = fs.readFileSync(path, "utf-8");

    const jsonData = JSON.parse(data);
    return jsonData;
}