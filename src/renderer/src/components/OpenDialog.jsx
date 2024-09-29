import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OpenDialog = () => {
  const [loading, setLoading] = useState(false)
  const [filePath, setFilePath] = useState('')
  const [files, setFiles] = useState([])

  const navigate = useNavigate()

  const openDialog = async () => {
    setLoading(true)
    const path = await window.api.openFile()
    const files = await window.api.getAllImageFileNames(path)
    navigate('/files')

    // setFilePath(path)
    // setFiles(files)
    // setLoading(false)
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
