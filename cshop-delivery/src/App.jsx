import "./styles/reset/reset.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login";
import { Redirect } from "react-router-dom";
import Requests from "./pages/Admin/Requests";
import Packages from "./pages/Admin/Packages";
import Delivering from "./pages/Admin/Delivering";
import Success from "./pages/Admin/Success";

function App() {
    return (
        <div className="App">
            <ThemeContextProvider>
                <Router>
                    <Switch>
                        <Redirect path="/admin" to="/admin/requests" exact />
                        <Route path="/admin/requests" exact>
                            <Requests />
                        </Route>
                        <Route path="/admin/packages" exact>
                            <Packages />
                        </Route>
                        <Route path="/admin/delivering" exact>
                            <Delivering />
                        </Route>
                        <Route path="/admin/success" exact>
                            <Success />
                        </Route>
                        <Route path="/">
                            <NavBar />
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                        </Route>
                    </Switch>
                </Router>
            </ThemeContextProvider>
        </div>
    );
}

export default App;
