const { app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require('fs');
const path = require('path');
const pathSettingJSON = "src/settings/settings.json";

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