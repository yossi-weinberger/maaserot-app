const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");

function createWindow() {
  console.log("Creating window...");
  console.log("App is packaged:", app.isPackaged);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("__dirname:", __dirname);
  console.log("ResourcesPath:", process.resourcesPath);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  let startUrl;
  if (process.env.NODE_ENV === "development") {
    startUrl = "http://localhost:3000";
  } else {
    let indexPath;
    if (app.isPackaged) {
      indexPath = path.join(process.resourcesPath, "web", "out", "index.html");
    } else {
      indexPath = path.join(__dirname, "..", "web", "out", "index.html");
    }
    startUrl = url.format({
      pathname: indexPath,
      protocol: "file:",
      slashes: true,
    });
  }

  // טיפול בקבצים סטטיים
  protocol.registerFileProtocol("file", (request, callback) => {
    const url = new URL(request.url);
    let filePath = decodeURIComponent(url.pathname);

    console.log("Original requested path:", filePath);

    // Remove leading '/' for Windows
    if (process.platform === "win32") {
      filePath = filePath.slice(1);
    }

    if (filePath.startsWith("icons/") || filePath.startsWith("images/")) {
      filePath = app.isPackaged
        ? path.join(process.resourcesPath, "public", filePath)
        : path.join(__dirname, "..", "web", "public", filePath);
    } else {
      filePath = app.isPackaged
        ? path.join(process.resourcesPath, "web", "out", filePath)
        : path.join(__dirname, "..", "web", "out", filePath);
    }

    console.log("Resolved file path:", filePath);

    // בדיקה אם הקובץ קיים
    if (fs.existsSync(filePath)) {
      callback({ path: filePath });
    } else {
      console.error("File not found:", filePath);
      callback({ error: -6 }); // FILE_NOT_FOUND
    }
  });

  console.log("Start URL:", startUrl);
  win.loadURL(startUrl);

  // טיפול בניווט פנימי
  win.webContents.on("will-navigate", (event, newUrl) => {
    event.preventDefault();
    const parsedUrl = new URL(newUrl);
    let pathname = parsedUrl.pathname;
    console.log("Navigating to:", pathname);

    if (process.env.NODE_ENV === "development") {
      win.loadURL(`http://localhost:3000${pathname}`);
    } else {
      // הסרת ה-drive letter ו-leading slashes
      pathname = pathname.replace(/^\/[A-Za-z]:/, "").replace(/^\/+/, "");

      const filePath = path.join(
        app.isPackaged ? process.resourcesPath : path.join(__dirname, ".."),
        "web",
        "out",
        pathname,
        "index.html"
      );

      console.log("Attempting to load file:", filePath);

      if (fs.existsSync(filePath)) {
        console.log("Loading file:", filePath);
        win.loadFile(filePath);
      } else {
        console.error("File not found:", filePath);
        console.log("Loading 404 page");
        win.loadFile(
          path.join(
            app.isPackaged ? process.resourcesPath : path.join(__dirname, ".."),
            "web",
            "out",
            "404.html"
          )
        );
      }
    }
  });

  // פתיחת DevTools רק במצב פיתוח
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }

  // הדפסת תוכן תיקיית out
  const outDir = app.isPackaged
    ? path.join(process.resourcesPath, "web", "out")
    : path.join(__dirname, "..", "web", "out");
  console.log("Contents of out directory:", fs.readdirSync(outDir));
}

app.whenReady().then(() => {
  console.log("App is ready");
  createWindow();
});

app.on("window-all-closed", () => {
  console.log("All windows closed");
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  console.log("App activated");
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
