const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    fullscreenable: false,
    title: 'OVI-Calc',
    icon: path.join(__dirname, 'design', 'CALC.png'), // <-- Add this line
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On Linux and Windows, quit when all windows are closed
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On macOS, recreate a window if none are open
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

