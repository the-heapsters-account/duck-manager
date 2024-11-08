const { app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { exec } = require('child_process');

const paths = {
    settingsJSON: 'settings/settings.json',
    icon: 'resources/imgs/logo.png',
    filesJava: 'lista de pedidos/src/java/',
    app: 'app/app.html'
}

function execCommand(cmd, msgError) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
        if(error) {
            return reject(msgError + error.message);
        }
        if(stderr) {
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
        icon: paths.icon,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'), // comunicação entre processos para renderização de na interface
            contextIsolation: true, // garante o isolamento de contexto para segurança
            enableRemoteModule: false // desativa o módulo remoto para segurança
        }
    });

    // win.webContents.openDevTools();
    win.loadFile(paths.app);

    win.maximize();
});

// handler de pegar as configurações
ipcMain.handle("get-settings", () => {
    const filePath = path.join(__dirname, paths.settingsJSON);
    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
});

// handler de salvar as configurações
ipcMain.handle("save-settings", (event, settings) => {
    const filePath = path.join(__dirname, paths.settingsJSON);
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));

    return { status: "success" };
});

// handler de execução de queries
ipcMain.handle('execute-query', async (event, query) => {
    const settingsPath = path.join(__dirname, paths.settingsJSON);
    const rawConfig = fs.readFileSync(settingsPath);
    const json = JSON.parse(rawConfig);
    const connectionConfigs = json.db_configs.connection;

    let connection;

    try {
        connection = await mysql.createConnection({
            host: connectionConfigs.host,
            user: connectionConfigs.user,
            password: connectionConfigs.password,
            database: connectionConfigs.database
        });

        const [rows, fields] = await connection.execute(query);
        return rows;
    } catch(error) {
        if(error.code === 'ER_ACCESS_DENIED_ERROR') {
            return 'Erro: Acesso negado. Verifique suas credenciais.';
        } else if(error.code === 'ER_BAD_DB_ERROR') {
            return 'Erro: Banco de dados não encontrado.';
        } else {
            return 'Erro ao conectar com o banco de dados: ' + error.message;
        }
    } finally {
        if(connection) {
            await connection.end();
        }
    }
});

// handler de execução de arquivos Java
ipcMain.handle('compile-java-file', (event, dir, fileJava) => {
    return execCommand(`cd java/${dir} && javac -d bin ${fileJava}`, `erro ao compilar o arquivo Java "${fileJava}": `);
});

// handler de execução de classes Java
ipcMain.handle('execute-java-class', (event, dir, classJava) => {
    return execCommand(`cd java/${dir}/bin && java ${classJava}`, `erro ao executar a classe Java "${classJava}": `);
});

// fechando a janela do app em no windows e linux
app.on("window-all-closed", () => {
    if(process.platform != "darwin") {
        app.quit();
    }
});

// abrindo a aplicação no macOS
app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});