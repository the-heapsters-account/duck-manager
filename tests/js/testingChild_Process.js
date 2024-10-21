const { exec } = require('child_process');

function seila(cmd) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o programa Java: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Erro: ${stderr}`);
            return;
        }
    });
}

seila('cd ../../ && cd src/java/createXML && javac -d bin Main.java');