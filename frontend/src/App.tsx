import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ManageAccount } from "./_manage/page/ManageAccount";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route path="/about">
                            <ManageAccount />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
