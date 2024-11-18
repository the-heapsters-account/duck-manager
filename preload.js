const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("api", {
    getConfigs: () => ipcRenderer.invoke('get-settings'),
    saveConfigs: data => ipcRenderer.invoke('save-settings', data),
    executeQuery: query => ipcRenderer.invoke('execute-query', query),
    compileJavaFile: (dir, fileJava) => ipcRenderer.invoke('compile-java-file'),
    executeJavaClass: (dir, classJava) => ipcRenderer.invoke('execute-java-class', classJava),
    getColumnsDB: () => ipcRenderer.invoke('get-columns-db'),
    getTableDB: () => ipcRenderer.invoke('get-table-db'),
    getQuantidadeMinima: () => ipcRenderer.invoke('get-quantidade-minima'),
    getInfosListaPedidos: () => ipcRenderer.invoke('get-infos-lista-pedidos'),
    getNameColumnQuantity: () => ipcRenderer.invoke('get-name-column-quantity')
});