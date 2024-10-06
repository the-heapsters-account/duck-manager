const {app, BrowserWindow, ipcMain } = require('electron/main');
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
        webPreferences: {
            preload: path.join(__dirname, './preload.js') // comunicação entre processos para renderização de na interface
        }
    });

    win.loadFile("src/pages/main/index.html");
};

// fechando a janela do app em no windows e linux
app.on("window-all-closed", () => {
    if(process.platform != "darwin") {
        app.quit();
    }
});

app.whenReady().then(() => {
    createWindow();
});