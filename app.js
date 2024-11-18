const { app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { exec } = require('child_process');

const paths = {
    settingsJSON: 'settings/settings.json',
    icon: 'resources/imgs/logo.png',
    dirJava: 'lista-de-pedidos/src',
    app: 'app/app.html'
}

function execCommand(cmd, msgError) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
        if(error) return reject(msgError + error.message);
        if(stderr) return reject("error: " + stderr);

        resolve(stdout);
        });
    });
}

function readSettingsJSON() {
    const filePath = path.join(__dirname, paths.settingsJSON);
    const settings = fs.readFileSync(filePath, 'utf-8');
    const settingsJSON = JSON.parse(settings);

    return settingsJSON;
}

function getObjectKeys(object) {
    return Object.keys(object)
}

function getObjectValues(object) {
    return Object.values(object)
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

    win.webContents.openDevTools();
    win.loadFile(paths.app);
    win.maximize();
    // win.removeMenu();
});

// handler de pegar as configurações
ipcMain.handle("get-settings", () => { return readSettingsJSON() });

// handler de salvar as configurações
ipcMain.handle("save-settings", (event, settings) => {
    const filePath = path.join(__dirname, paths.settingsJSON);
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));

    return { status: "success" };
});

// handler de execução de queries
ipcMain.handle('execute-query', async (event, query) => {
    const settings = readSettingsJSON();
    const connectionConfigs = settings.db_configs.connection;

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
        if(connection) await connection.end();
    }
});

// handler de execução de arquivos Java
ipcMain.handle('compile-java-file', () => { return execCommand(`cd ${paths.dirJava} && javac -d bin *.java`, `erro ao compilar o arquivo Java "${fileJava}": `) });

// handler de execução de classes Java
ipcMain.handle('execute-java-class', (event, classJava, args) => { return execCommand(`cd ${paths.dirJava} && java -cp bin ${classJava} ${args}`, `erro ao executar a classe Java "${classJava}": `) });

// handler pra pegar as colunas do banco de dados que serão usadas
ipcMain.handle('get-columns-db', () => {
    const settings = readSettingsJSON();
    const columns = settings.db_columns;

    return {
        columnsPresentation: getObjectKeys(columns),
        columnsDB: getObjectValues(columns)
    };
});

// handler pra pegar a tabela do banco de dados que será usada
ipcMain.handle('get-table-db', () => {
    const settings = readSettingsJSON();
    const tableSelected = settings.db_configs.table_selected;

    return tableSelected;
});

// handler pra pegar a quantidade mínima das configurações
ipcMain.handle('get-quantidade-minima', () => {
    const settings = readSettingsJSON();
    const quantidadeMinimaValue = settings.quantidade_minima;

    return quantidadeMinimaValue;
});

// handler pra pegar informações da lista de pedidos
ipcMain.handle('get-infos-lista-pedidos', () => {
    const settings = readSettingsJSON();
    const dbColumns = settings.db_columns;
    const spreadsheetInfos = settings.spreadsheet_infos;

    return {
        dbColumns: {
            dbColumnsNames: getObjectKeys(dbColumns),
            dbColumnsNamesPresentation: getObjectValues(dbColumns)
        },
        spreadsheetInfos: {
            namesInfo: getObjectKeys(spreadsheetInfos),
            namesInfoPresentation: getObjectValues(spreadsheetInfos)
        },
        columnsImportants: {
            columnQuantity: settings.columns_importants.column_quantity
        }
    }
});

//handler pra pegar a coluna que contém a quantidade dos produtos pra pegar o nome selecionado
ipcMain.handle('get-name-column-quantity', () => {
    const settings = readSettingsJSON();
    const columnSelectedName = settings.columns_importants.column_quantity;

    return columnSelectedName;
});

// fechando a janela do app em no windows e linux
app.on("window-all-closed", () => { if(process.platform != "darwin") app.quit() });

// abrindo a aplicação no macOS
app.on("activate", () => { if(BrowserWindow.getAllWindows().length === 0)  createWindow() });