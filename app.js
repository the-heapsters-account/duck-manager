const {app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require('fs');
const path = require('path');
const pathSettingJSON = "src/settings/settings.json";

function createWindow() {
    widthSize = 800;
    heightSize = 600;

    const win = new BrowserWindow({
        width: 800,
        height: 1000,
        resizable: true
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