<<<<<<< Updated upstream
=======
<<<<<<< HEAD
import Users from "./_manage/pages/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BannedSeller } from "./_manage/pages/BannedSeller";
=======
>>>>>>> Stashed changes
import ManageAccount from './_manage/pages/ManageAccount';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
>>>>>>> 9619b8507d16c36f54943518d3d74e697526f486

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route path="/manage">
                            <Users />
                        </Route>
                        <Route exec path="/manage/bannedseller">
                            <BannedSeller />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
