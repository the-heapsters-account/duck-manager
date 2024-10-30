const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("api", {
    getConfigs: () => ipcRenderer.invoke('get-configs'),
    saveConfigs: data => ipcRenderer.invoke('save-configs', data),
    executeQuery: query => ipcRenderer.invoke('execute-query', query),
    compileJavaFile: (dir, fileJava) => ipcRenderer.invoke('compile-java-file', dir, fileJava),
    executeJavaClass: (dir, classJava) => ipcRenderer.invoke('execute-java-class', dir, classJava)
});