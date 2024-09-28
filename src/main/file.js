import { dialog } from 'electron/main'
import { readdir } from 'fs/promises'

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  if (!canceled) {
    return filePaths[0]
  }
}

const getAllImageFileNames = async (_, path) => await readdir(path)

export { handleFileOpen, getAllImageFileNames }
