const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");

const isDevelopment = process.env.NODE_ENV === "development" || !app.isPackaged;

console.log("Application starting...");
console.log("isDevelopment:", isDevelopment);
console.log("__dirname:", __dirname);
console.log("process.resourcesPath:", process.resourcesPath);

function createWindow() {
  console.log("Creating window...");

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
  if (isDevelopment) {
    startUrl = "http://localhost:3000";
  } else {
    startUrl = url.format({
      pathname: path.join(process.resourcesPath, "web", "out", "index.html"),
      protocol: "file:",
      slashes: true,
    });
  }

  console.log("Start URL:", startUrl);

  protocol.registerFileProtocol("file", (request, callback) => {
    const fileUrl = request.url.substr(7); // remove "file://"
    let filePath = path.normalize(decodeURIComponent(fileUrl));

    console.log("Original requested path:", filePath);

    if (!isDevelopment) {
      filePath = filePath.replace(/^\/[A-Za-z]:/, "").replace(/^\/+/, "");
      console.log(
        "Path after removing drive letter and leading slashes:",
        filePath
      );

      if (
        filePath.includes("_next") ||
        filePath.endsWith(".js") ||
        filePath.endsWith(".css")
      ) {
        filePath = path.join(process.resourcesPath, "web", "out", filePath);
      } else if (filePath.includes("icons") || filePath.includes("images")) {
        filePath = path.join(process.resourcesPath, "public", filePath);
      } else {
        filePath = path.join(process.resourcesPath, "web", "out", filePath);
      }
    }

    console.log("Final resolved file path:", filePath);

    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        console.error("File access error:", err);
        callback({ error: -6 }); // FILE_NOT_FOUND
      } else {
        console.log("File exists and is readable");
        callback({ path: filePath });
      }
    });
  });

  win.loadURL(startUrl);

  win.webContents.on("will-navigate", (event, newUrl) => {
    event.preventDefault();
    let pathname = new URL(newUrl).pathname;
    console.log("Navigating to:", pathname);

    if (isDevelopment) {
      win.loadURL(`http://localhost:3000${pathname}`);
    } else {
      pathname = pathname.replace(/^\/[A-Za-z]:/, "").replace(/^\/+/, "");

      // Try to load index.html from the specific route directory
      let filePath = path.join(
        process.resourcesPath,
        "web",
        "out",
        pathname,
        "index.html"
      );

      console.log("Attempting to load file:", filePath);

      fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
          console.error("File access error:", err);
          // If index.html is not found, try loading the HTML file directly
          filePath = path.join(
            process.resourcesPath,
            "web",
            "out",
            `${pathname}.html`
          );
          fs.access(filePath, fs.constants.R_OK, (err) => {
            if (err) {
              console.error("File access error:", err);
              // If both attempts fail, load the 404 page
              win.loadFile(
                path.join(process.resourcesPath, "web", "out", "404.html")
              );
            } else {
              console.log("File exists and is readable, loading:", filePath);
              win.loadFile(filePath);
            }
          });
        } else {
          console.log("File exists and is readable, loading:", filePath);
          win.loadFile(filePath);
        }
      });
    }
  });

  win.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      console.error("Failed to load URL:", validatedURL);
      console.error("Error code:", errorCode);
      console.error("Error description:", errorDescription);
    }
  );

  win.webContents.on("did-finish-load", () => {
    console.log("Page finished loading");
  });

  if (isDevelopment) {
    win.webContents.openDevTools();
  }
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

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});
// const { app, BrowserWindow, protocol } = require("electron");
// const path = require("path");
// const fs = require("fs");
// const url = require("url");

// function createWindow() {
//   console.log("Creating window...");
//   console.log("App is packaged:", app.isPackaged);
//   console.log("NODE_ENV:", process.env.NODE_ENV);
//   console.log("__dirname:", __dirname);
//   console.log("ResourcesPath:", process.resourcesPath);

//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   let startUrl;
//   if (process.env.NODE_ENV === "development") {
//     startUrl = "http://localhost:3000";
//   } else {
//     //   let indexPath;
//     //   if (app.isPackaged) {
//     //     indexPath = path.join(process.resourcesPath, "web", "out", "index.html");
//     //   } else {
//     //     indexPath = path.join(__dirname, "..", "web", "out", "index.html");
//     //   }
//     //   startUrl = url.format({
//     //     pathname: indexPath,
//     //     protocol: "file:",
//     //     slashes: true,
//     //   });
//     // }
//     let indexPath;
//     if (app.isPackaged) {
//       indexPath = path.join(process.resourcesPath, "web", "out", "index.html");
//     } else {
//       indexPath = path.join(__dirname, "..", "web", "out", "index.html");
//     }
//     startUrl = url.format({
//       pathname: indexPath,
//       protocol: "file:",
//       slashes: true,
//     });

//     console.log("Starting URL:", startUrl);
//     console.log("Index path exists:", fs.existsSync(indexPath));
//   }

//   // טיפול בקבצים סטטיים
//   protocol.registerFileProtocol("file", (request, callback) => {
//     const url = new URL(request.url);
//     let filePath = decodeURIComponent(url.pathname);

//     console.log("Original requested path:", filePath);

//     // Remove leading '/' for Windows
//     if (process.platform === "win32") {
//       filePath = filePath.slice(1);
//     }

//     if (filePath.startsWith("icons/") || filePath.startsWith("images/")) {
//       filePath = app.isPackaged
//         ? path.join(process.resourcesPath, "public", filePath)
//         : path.join(__dirname, "..", "web", "public", filePath);
//     } else {
//       filePath = app.isPackaged
//         ? path.join(process.resourcesPath, "web", "out", filePath)
//         : path.join(__dirname, "..", "web", "out", filePath);
//     }

//     console.log("Resolved file path:", filePath);

//     // בדיקה אם הקובץ קיים
//     if (fs.existsSync(filePath)) {
//       callback({ path: filePath });
//     } else {
//       console.error("File not found:", filePath);
//       // נסה לטעון את index.html אם הקובץ לא נמצא
//       const indexPath = path.join(path.dirname(filePath), "index.html");
//       if (fs.existsSync(indexPath)) {
//         console.log("Loading index.html instead:", indexPath);
//         callback({ path: indexPath });
//       } else {
//         console.error("index.html also not found");
//         callback({ error: -6 }); // FILE_NOT_FOUND
//       }
//     }
//   });
//   console.log("Start URL:", startUrl);
//   win.loadURL(startUrl);

//   // טיפול בניווט פנימי
//   win.webContents.on("will-navigate", (event, newUrl) => {
//     event.preventDefault();
//     const parsedUrl = new URL(newUrl);
//     let pathname = parsedUrl.pathname;
//     console.log("Navigating to:", pathname);

//     if (process.env.NODE_ENV === "development") {
//       win.loadURL(`http://localhost:3000${pathname}`);
//     } else {
//       // הסרת ה-drive letter ו-leading slashes
//       pathname = pathname.replace(/^\/[A-Za-z]:/, "").replace(/^\/+/, "");

//       const filePath = path.join(
//         app.isPackaged ? process.resourcesPath : path.join(__dirname, ".."),
//         "web",
//         "out",
//         pathname,
//         "index.html"
//       );

//       console.log("Attempting to load file:", filePath);

//       if (fs.existsSync(filePath)) {
//         console.log("Loading file:", filePath);
//         win.loadFile(filePath);
//       } else {
//         console.error("File not found:", filePath);
//         console.log("Loading 404 page");
//         win.loadFile(
//           path.join(
//             app.isPackaged ? process.resourcesPath : path.join(__dirname, ".."),
//             "web",
//             "out",
//             "404.html"
//           )
//         );
//       }
//     }
//   });

//   // פתיחת DevTools רק במצב פיתוח
//   if (process.env.NODE_ENV === "development") {
//     win.webContents.openDevTools();
//   }

//   // הדפסת תוכן תיקיית out
//   const outDir = app.isPackaged
//     ? path.join(process.resourcesPath, "web", "out")
//     : path.join(__dirname, "..", "web", "out");
//   console.log("Contents of out directory:", fs.readdirSync(outDir));
// }

// app.whenReady().then(() => {
//   console.log("App is ready");
//   createWindow();
// });

// app.on("window-all-closed", () => {
//   console.log("All windows closed");
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", () => {
//   console.log("App activated");
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });
