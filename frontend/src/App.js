
import Users from "./_manage/pages/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BannedSeller from "./_manage/pages/BannedSeller";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/manage">
                            <Users />
                        </Route>
                        <Route exact path="/manage/bannedseller">
                            <BannedSeller />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
