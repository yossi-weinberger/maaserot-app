import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      // webSecurity: false // זה מסוכן בייצור, אבל יעזור לנו לדבג
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000");
  } else {
    const indexPath = path.join(__dirname, "..", "web", "out", "index.html");
    console.log("Trying to load:", indexPath);
    if (fs.existsSync(indexPath)) {
      win.loadFile(indexPath);
    } else {
      console.error("index.html not found at:", indexPath);
      win.loadFile(path.join(__dirname, "error.html"));
    }
  }

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
