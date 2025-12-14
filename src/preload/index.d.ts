import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
   interface Window {
      electron: ElectronAPI;
      api: {
         openFile: () => Promise<string | undefined>;
         getAllImageFileNames: (path: string) => Promise<string[]>;
         bulkDeleteFiles: (filePaths: string[]) => Promise<void>;
         fakeBulkDeleteFiles: () => Promise<void>;
      };
   }
}
