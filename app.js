const { app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const { exec } = require('child_process');

const pathSettingJSON = "src/settings/settings.json";
const loadDBConfig = () => {
    const configPath = path.join(__dirname, "src/settings/settings.json");
    const rawConfig = fs.readFileSync(configPath);
    const json = JSON.parse(rawConfig);
    const dbConfigs = json.dbConfigs;

    return dbConfigs;
};

function createWindow() {
    widthSize = 800;
    heightSize = 600;

    const win = new BrowserWindow({
        width: widthSize,
        height: heightSize,
        minwidth: widthSize,
        minheight: heightSize,
        // icon: iconPath, // --> icon path bem aqui
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js') // comunicação entre processos para renderização de na interface
        }
    });

    win.loadFile("src/pages/main/index.html");

    win.maximize();
};

function execCommand(cmd, msgError) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return msgError + error.message;
        }
        if (stderr) {
            return "error: " + stderr;
        }
    });
}

app.whenReady().then(() => createWindow());

ipcMain.handle('read-json', async () => {
    const filePath = path.join(__dirname, pathSettingJSON);
    const data = fs.readFileSync(filePath, 'utf-8');


    return JSON.parse(data);
});

ipcMain.handle("save-json", async (event, config) => {
    const filePath = path.join(__dirname, pathSettingJSON);
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));

    return { status: "success" };
});

ipcMain.handle('execute-query', async (event, query, params) => {
    const dbConfig = loadDBConfig();
    const connection = await mysql.createConnection(dbConfig);

    try {
        const [rows, fields] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.error('erro ao executar query:', error);
        throw error;
    } finally {
        await connection.end();
    }
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