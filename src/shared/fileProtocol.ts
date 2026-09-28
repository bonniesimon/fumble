export const FILE_PROTOCOL = "file-protocol";

const FILE_PROTOCOL_PREFIX = `${FILE_PROTOCOL}://file/`;

// The whole path is encoded as one component so Windows paths (C:\...) and
// file names with spaces, "#", "?" or "%" survive the round trip.
export const toFileProtocolUrl = (filePath: string): string =>
   FILE_PROTOCOL_PREFIX + encodeURIComponent(filePath);

export const fromFileProtocolUrl = (url: string): string =>
   decodeURIComponent(url.slice(FILE_PROTOCOL_PREFIX.length));
