import Users from "./_manage/pages/Users";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import BannedSeller from "./_manage/pages/BannedSeller";
import Sellers from "./_manage/pages/Sellers";
import BannedUsers from "./_manage/pages/BannedUsers";
import SidebarLayout from './common/layouts/SidebarLayout';
import HomePage from './_home/pages/Home';

function App() {

    return (
        <div className="App">
            <Router>
                <Switch> 
                    {/* REDIRECT / to /home */}
                    <Redirect path="/" to="/home"></Redirect>
                    
                    {/* ROUTES FOR Sidebar Layout ATTACHED */}
                    <Route>
                        <SidebarLayout>
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
                        </SidebarLayout>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
