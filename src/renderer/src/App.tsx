import { Route } from "react-router-dom";

import { Router } from "../../lib/electron-router-dom";
import Files from "./components/Files";
import OpenDialog from "./components/OpenDialog";
import routes from "./constants/routes";

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
   );
};

export default App;
