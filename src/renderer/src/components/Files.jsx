import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import routes from '../constants/routes'
import { FILE_PROTOCOL } from '../../../shared/fileProtocol'

const Files = () => {
  const [searchParams] = useSearchParams()
  const [files, setFiles] = useState([])
  console.log({ searchParams: searchParams.get('path') })

  const getFilesForPath = async () => {
    const files = await window.api.getAllImageFileNames(searchParams.get('path'))
    setFiles(files)
  }

  useEffect(() => {
    if (searchParams.get('path') === '') return undefined

    getFilesForPath()
  }, [])

  return (
    <>
      <Link to={routes.index}>Open another directory</Link>
      <div>{searchParams.get('path')}</div>
      {files?.map((file) => (
        <img
          className="image"
          key={file}
          src={`${FILE_PROTOCOL}:///${searchParams.get('path')}/${file}`}
        />
      ))}
    </>
  )
}

export default Files
