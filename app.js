const { app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { exec } = require('child_process');
const absolutePath = "%ABSOLUTE_PATH%"

const pathSettingsJSON = "src/settings/settings.json";
const pathIcon = "resources/imgs/logo.png";

function execCommand(cmd, msgError) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return reject(msgError + error.message);
        }
        if (stderr) {
            return reject("error: " + stderr);
        }
        resolve(stdout);
        });
    });
}

app.whenReady().then(() => {
    widthSize = 800;
    heightSize = 600;

    const win = new BrowserWindow({
        width: widthSize,
        height: heightSize,
        minWidth: widthSize,
        minHeight: heightSize,
        icon: pathIcon,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'), // comunicação entre processos para renderização de na interface
            contextIsolation: true, // garante o isolamento de contexto para segurança
            enableRemoteModule: false // desativa o módulo remoto para segurança
        }
    });

    win.webContents.openDevTools();
    win.loadFile("src/pages/main/index.html");

    win.maximize();
});

ipcMain.handle("get-configs", async () => {
    const filePath = path.join(__dirname, pathSettingsJSON);
    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
});

ipcMain.handle("save-configs", async (event, config) => {
    const filePath = path.join(__dirname, pathSettingsJSON);
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));

    return { status: "success" };
});

ipcMain.handle('execute-query', async (event, query) => {
    const configPath = path.join(__dirname, pathSettingsJSON);
    const rawConfig = fs.readFileSync(configPath);
    const json = JSON.parse(rawConfig);
    const connectionConfigs = json.db_configs.connection;

    let connection;

    try {
        console.log('Conectando-se ao banco de dados com as seguintes credenciais: ' + connectionConfigs);
        connection = await mysql.createConnection({
            host: connectionConfigs.host,
            user: connectionConfigs.user,
            password: connectionConfigs.password,
            database: connectionConfigs.database
        });

        console.log('Executando a query: ' + query);
        const [rows, fields] = await connection.execute(query);
        console.log('Resultado da query:\n' + rows);
        return rows;
    } catch(error) {
        console.error('Erro durante a execução da query: ' + error.code);

        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            return 'Erro: Acesso negado. Verifique suas credenciais.';
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            return 'Erro: Banco de dados não encontrado.';
        } else {
            return 'Erro ao conectar com o banco de dados: ' + error.message;
        }
    } finally {
        if (connection) {
            console.log('Fechando conexão');
            await connection.end();
        }
    }
});

ipcMain.handle('compile-java-file', async (event, dir, fileJava) => {
    return execCommand(`cd src/java/${dir} && javac -d bin ${fileJava}`, `erro ao compilar o arquivo Java "${fileJava}": `);
});

// cd src/java/${dir}/bin && java ${fileJava}
ipcMain.handle('execute-java-class', async (event, dir, classJava) => {
    return execCommand(`cd src/java/${dir}/bin && java ${classJava}`, `erro ao executar a classe Java "${classJava}": `);
});

// fechando a janela do app em no windows e linux
app.on("window-all-closed", () => {
    if(process.platform != "darwin") {
        app.quit();
    }
});

// abrindo a aplicação no macOS
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});