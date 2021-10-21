import Users from "./_manage/pages/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BannedSeller from "./_manage/pages/BannedSeller";
import Sellers from "./_manage/pages/Sellers";
import BannedUsers from "./_manage/pages/BannedUsers";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/manage/users">
                            <Users />
                        </Route>
                        <Route exact path="/manage/bannedsellers">
                            <BannedSeller />
                        </Route>
                        <Route exact path="/manage/sellers">
                            <Sellers />
                        </Route>
                        <Route exact path="/manage/bannedusers">
                            <BannedUsers />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
