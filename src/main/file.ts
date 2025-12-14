import { IpcMainInvokeEvent } from "electron";
import { dialog } from "electron/main";
import { readdir, unlink } from "fs/promises";
import { extname } from "path";

const handleFileOpen = async (): Promise<string | undefined> => {
   const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
   });
   if (!canceled) {
      return filePaths[0];
   }
};

const getAllImageFileNames = async (
   _event: IpcMainInvokeEvent,
   path: string
): Promise<string[]> => {
   const allFiles = await readdir(path);
   const imageFiles = allFiles.filter(file =>
      [".jpg", ".jpeg", ".png", ".gif"].includes(extname(file).toLowerCase())
   );

   // TODO: Handle cases where the filepath has spaces
   // TODO: Add check to do this only for macOS
   const filteredImageFilesForMac = imageFiles.filter(filename => {
      // Filter out files starting with "._" (macOS metadata files)
      if (filename.startsWith("._")) return false;

      // Filter out .DS_Store files
      if (filename === ".DS_Store") return false;

      // Filter out other common macOS system files
      const macSystemFiles = [".localized", ".Spotlight-V100", ".Trashes", "__MACOSX"];
      if (macSystemFiles.includes(filename)) return false;

      return true;
   });

   return filteredImageFilesForMac;
};

const bulkDeleteFiles = (
   _event: IpcMainInvokeEvent,
   filePaths: string[]
): Promise<void[] | void> => {
   if (process.env.ELECTRON_ENV == "development") {
      console.info("fakeBulkDeleteFiles ran");
      return fakeBulkDeleteFiles();
   }

   return Promise.all(filePaths.map(path => unlink(path)));
};

const fakeBulkDeleteFiles = (): Promise<void> =>
   new Promise(resolve => {
      setTimeout(resolve, 1000);
   });

export { handleFileOpen, getAllImageFileNames, bulkDeleteFiles, fakeBulkDeleteFiles };
