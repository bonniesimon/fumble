import { electronApp, optimizer } from "@electron-toolkit/utils";
import { app, shell, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { protocol } from "electron";
import { join } from "path";

import icon from "../../resources/icon.png?asset";
import { registerRoute } from "../lib/electron-router-dom";
import { FILE_PROTOCOL } from "../shared/fileProtocol";
import { bulkDeleteFiles, fakeBulkDeleteFiles, getAllImageFileNames, handleFileOpen } from "./file";

function createWindow(): void {
   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 1400,
      height: 847,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === "linux" ? { icon } : {}),
      webPreferences: {
         preload: join(__dirname, "../preload/index.js"),
         sandbox: false,
      },
   });

   registerRoute({
      id: "main",
      browserWindow: mainWindow,
      htmlFile: join(__dirname, "../renderer/index.html"),
   });

   mainWindow.on("ready-to-show", () => {
      mainWindow.show();
   });

   mainWindow.webContents.setWindowOpenHandler(details => {
      shell.openExternal(details.url);
      return { action: "deny" };
   });

   // The below is no more required since we're using electron-router-dom
   // HMR for renderer base on electron-vite cli.
   // Load the remote URL for development or the local html file for production.
   // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
   //   mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
   // } else {
   //   mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
   // }
}

protocol.registerSchemesAsPrivileged([{ scheme: FILE_PROTOCOL, privileges: { bypassCSP: true } }]);

type IpcHandler = (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown;

const IPC_HANDLERS: Record<string, IpcHandler> = {
   "dialog:openFile": handleFileOpen as IpcHandler,
   "file:getAllImageFileNames": getAllImageFileNames as IpcHandler,
   "file:bulkDeleteFiles": bulkDeleteFiles as IpcHandler,
   "file:fakeBulkDeleteFiles": fakeBulkDeleteFiles as IpcHandler,
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   protocol.registerFileProtocol(FILE_PROTOCOL, (request, callback) => {
      const url = request.url.replace(`${FILE_PROTOCOL}://`, "");
      try {
         return callback(decodeURIComponent(url));
      } catch (error) {
         // Handle the error as needed
         console.error(error);
      }
   });

   Object.keys(IPC_HANDLERS).forEach(channel => ipcMain.handle(channel, IPC_HANDLERS[channel]));
   // Set app user model id for windows
   electronApp.setAppUserModelId("com.electron");

   // Default open or close DevTools by F12 in development
   // and ignore CommandOrControl + R in production.
   // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
   app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
   });

   // IPC test
   ipcMain.on("ping", () => console.log("pong"));

   createWindow();

   app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
      app.quit();
   }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
