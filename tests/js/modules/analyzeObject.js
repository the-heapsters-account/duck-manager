const { readJSON } = require('./readJSON');

const jsonData = readJSON('../../json/settings.json');

function analyzeObject(object) {
  const array = []; // Declare a variável 'array' aqui

  Object.entries(object).forEach(([key, value]) => {
    array.push({ key, value }); // Adiciona o par chave-valor ao array

    if (typeof value === "object" && value !== null) {
      // Se o valor for um objeto, faz a recursão
      const nestedArray = analyzeObject(value); // Captura o resultado da recursão
      array.push(...nestedArray); // Adiciona os resultados ao array principal
    }
  });

  return array;
}

const myArray = analyzeObject(jsonData);
console.log(myArray);