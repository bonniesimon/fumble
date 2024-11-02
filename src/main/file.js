import { dialog } from "electron/main";
import { readdir, unlink } from "fs/promises";
import { extname } from "path";

const handleFileOpen = async () => {
   const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
   });
   if (!canceled) {
      return filePaths[0];
   }
};

const getAllImageFileNames = async (_, path) => {
   const allFiles = await readdir(path);
   const imageFiles = allFiles.filter(file =>
      [".jpg", ".jpeg", ".png", ".gif"].includes(extname(file).toLowerCase())
   );

   return imageFiles;
};

const bulkDeleteFiles = filePaths => Promise.all(filePaths.map(path => unlink(path)));

export { handleFileOpen, getAllImageFileNames, bulkDeleteFiles };
