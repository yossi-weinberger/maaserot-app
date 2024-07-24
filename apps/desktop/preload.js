// const { contextBridge } = require("electron");

// contextBridge.exposeInMainWorld("electron", {
//   isElectron: true,
// });

// window.isElectronApp = true;

const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  isElectron: true,
});
