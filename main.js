const {app, BrowserWindow} = require('electron/main');

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false
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