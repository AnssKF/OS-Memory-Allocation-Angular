const {app, BrowserWindow} = require('electron');
const url = require("url");
const path = require("path");

let win;

app.on('ready',()=>{
    win = new BrowserWindow({})
    win.loadURL(url.format({
        pathname: path.join(__dirname, "dist/process-memory-allocator/index.html"),
        protocol: "file:",
        slashes: true
    }))

    win.on('closed',() => {
        win = null;
    })
});
