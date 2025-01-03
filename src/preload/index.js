import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
   openFile: () => ipcRenderer.invoke("dialog:openFile"),
   getAllImageFileNames: path => ipcRenderer.invoke("file:getAllImageFileNames", path),
   bulkDeleteFiles: filePaths => ipcRenderer.invoke("file:bulkDeleteFiles", filePaths),
   fakeBulkDeleteFiles: () => ipcRenderer.invoke("file:fakeBulkDeleteFiles"),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
   try {
      contextBridge.exposeInMainWorld("electron", electronAPI);
      contextBridge.exposeInMainWorld("api", api);
   } catch (error) {
      console.error(error);
   }
} else {
   window.electron = electronAPI;
   window.api = api;
}
