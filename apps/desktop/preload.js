const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  isElectron: true,
});
// import { contextBridge } from "electron";

// contextBridge.exposeInMainWorld("electron", {
//   isElectron: true,
// });
