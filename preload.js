const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    changeText:(text) => {
        ipcRenderer.send('change-text', text);
    },
    onRestoreText:(callback) => {
        ipcRenderer.on('restore-text', callback);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if(element) element.innerText = text;
    }
    for(const dependency of ['chrome', 'node', 'electron']){
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});