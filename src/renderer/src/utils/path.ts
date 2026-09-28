const isWindows = window.electron.process.platform === "win32";

export const PATH_SEPARATOR = isWindows ? "\\" : "/";

export const joinPath = (directory: string, filename: string): string =>
   directory.endsWith(PATH_SEPARATOR)
      ? `${directory}${filename}`
      : `${directory}${PATH_SEPARATOR}${filename}`;

// Windows also accepts "/" as a separator
export const splitPath = (filePath: string): string[] =>
   filePath.split(isWindows ? /[\\/]/ : "/").filter(Boolean);

export const basename = (filePath: string): string => splitPath(filePath).pop() || "";
