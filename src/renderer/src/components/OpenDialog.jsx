import { useState } from 'react'

const OpenDialog = () => {
  const [loading, setLoading] = useState(false)
  const [filePath, setFilePath] = useState('')
  const [files, setFiles] = useState([])

  const openDialog = async () => {
    setLoading(true)
    const path = await window.api.openFile()
    const files = await window.api.getAllImageFileNames(path)

    setFilePath(path)
    setFiles(files)
    setLoading(false)
  }

  if (filePath === '') {
    return (
      <div className="action">
        <button onClick={openDialog}>Open directory</button>
      </div>
    )
  }
  return (
    <>
      <div>{loading ? '...' : filePath}</div>
      {files?.map((file) => (
        <li key={file}>{file}</li>
      ))}
    </>
  )
}

export default OpenDialog
