const { app, BrowserWindow } = require('electron')

function openWindow() {
  let newwin = new BrowserWindow({
    width: 810,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  })
  newwin.setMenu(null);
  newwin.loadFile('index.html')
  newwin.setAutoHideMenuBar(true)
  newwin.webContents.openDevTools()
}

app.on('ready', openWindow)