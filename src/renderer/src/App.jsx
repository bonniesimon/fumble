import OpenDialog from './components/OpenDialog'
import { Switch, Route } from 'react-router-dom'
import routes from './constants/routes'
import Files from './components/Files'

const App = () => {
  return (
    <>
      <Switch>
        <Route component={OpenDialog} path={routes.home} />
        <Route component={Files} path={routes.files} />
      </Switch>
    </>
  )
}

export default App
