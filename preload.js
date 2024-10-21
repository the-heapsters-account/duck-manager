const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("api", {
    executeQuery: query => ipcRenderer.invoke('execute-query', query)
    readJSON: () => ipcRenderer.invoke('read-json'),
    saveJSON: data => ipcRenderer.invoke('save-json', data),
});