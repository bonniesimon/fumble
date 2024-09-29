import OpenDialog from './components/OpenDialog'
import { Route } from 'react-router-dom'
import routes from './constants/routes'
import Files from './components/Files'
import { Router } from '../../lib/electron-router-dom'

const App = () => {
  return (
    <Router
      main={
        <>
          <Route path={routes.index} element={<OpenDialog />} />
          <Route path={routes.files} element={<Files />} />
        </>
      }
    />
  )
}

export default App
