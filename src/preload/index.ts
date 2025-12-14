import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
   openFile: (): Promise<string | undefined> => ipcRenderer.invoke("dialog:openFile"),
   getAllImageFileNames: (path: string): Promise<string[]> =>
      ipcRenderer.invoke("file:getAllImageFileNames", path),
   bulkDeleteFiles: (filePaths: string[]): Promise<void> =>
      ipcRenderer.invoke("file:bulkDeleteFiles", filePaths),
   fakeBulkDeleteFiles: (): Promise<void> => ipcRenderer.invoke("file:fakeBulkDeleteFiles"),
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
   // @ts-expect-error (define in dts)
   window.electron = electronAPI;
   // @ts-expect-error (define in dts)
   window.api = api;
}
