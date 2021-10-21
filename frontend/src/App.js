import Users from "./_manage/pages/Users";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import BannedSeller from "./_manage/pages/BannedSeller";
import Sellers from "./_manage/pages/Sellers";
import BannedUsers from "./_manage/pages/BannedUsers";
import SidebarLayout from './common/layouts/SidebarLayout';
import HomePage from './_home/pages/Home';
import './common/assets/styles/transition.css';
import router from "./common/router";

function App() {

    return (
        <div className="App">
            <Router>
                <AnimatedSwitch> 
                    <Redirect path="/" to="/home"></Redirect>
                    
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
                </AnimatedSwitch>
            </Router>
        </div>
    );
}

export default App;
