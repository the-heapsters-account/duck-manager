const mkDir = require('./modules/mkDir');

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