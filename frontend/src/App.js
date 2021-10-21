import logo from './logo.svg';
import './App.css';
import ManageAccount from './_manage/pages/ManageAccount';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <ManageAccount />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
