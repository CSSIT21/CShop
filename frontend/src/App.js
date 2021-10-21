/** internal */
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/** layouts */
import SidebarLayout from './common/layouts/SidebarLayout';
import MainLayout from "./common/layouts/MainLayout";

/** pages */
import HomePage from './_home/pages/Home';
import UsersPage from "./_manage/pages/Users";
import BannedUsersPage from "./_manage/pages/BannedUsers";
import SellersPage from "./_manage/pages/Sellers";
import BannedSellerPage from "./_manage/pages/BannedSeller";

function App() {

    return (
        <div className="App">
            <Router>
                <Switch> 
                    {/* REDIRECT / to /home */}
                    <Redirect exact path="/" to="/home"></Redirect>
                    
                    {/* ROUTES FOR Sidebar Layout ATTACHED */}
                    <Route path="/manage/:path?" exact>
                        <SidebarLayout>
                            <Route exact path="/manage/users">
                                <UsersPage />
                            </Route>
                            <Route exact path="/manage/bannedsellers">
                                <BannedSellerPage />
                            </Route>
                            <Route exact path="/manage/sellers">
                                <SellersPage />
                            </Route>
                            <Route exact path="/manage/bannedusers">
                                <BannedUsersPage />
                            </Route>
                        </SidebarLayout>
                    </Route>
                    <Route>
                        <MainLayout>
                            <Route path="/home">
                                <HomePage/>
                            </Route>
                        </MainLayout>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
