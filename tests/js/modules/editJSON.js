// const fs = require("fs");
const { readJSON } = require("./readJSON");

const jsonData = readJSON("../../json/settings.json");

const objectKeys = Object.keys(jsonData);
const objectValues = Object.values(jsonData);
const objectPropertiesNames = Object.getOwnPropertyNames(jsonData);
const objectHasOwn = Object.hasOwn(jsonData, "exemplo");

// console.log(Object.values(jsonData));

function writeJSON(jsonData) {
}