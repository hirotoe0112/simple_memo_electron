const {app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
let savetext = "";

const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height:600,
        resizable:false,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.setMenu(null);

    win.on('close', () => {
        console.log(savetext);
        fs.writeFile('./save.txt', savetext, (err) => {
            console.log(err);
        });
    })

    ipcMain.on('change-text', (event, text) => {
        console.log(text);
        savetext = text;
    });

    win.loadFile('index.html');
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    //macOSでなければすべてのウインドウを終了したときにアプリを終了する
    if(process.platform !== 'darwin') app.quit();
});