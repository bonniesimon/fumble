import { useState } from 'react'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [filePath, setFilePath] = useState('')

  const openDialog = async () => {
    setLoading(true)
    const path = await window.api.openFile()

    setFilePath(path)
    setLoading(false)
  }
  return (
    <>
      <div className="action">
        <button onClick={openDialog}>Open directory</button>
      </div>
      <div>{loading ? '...' : filePath}</div>
    </>
  )
}

export default App
