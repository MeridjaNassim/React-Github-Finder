import React from "react";
import "./App.css";
import About from "./components/pages/About";
import NavBar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";
import GithubState from "./context/github/GitHubState";
import AlertState from "./context/alert/AlertState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/// entry point for the app .
const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <NavBar title=" Github Finder" icon="fab fa-github"></NavBar>
            <div className="container">
              <Alert />
              <Switch>
                {/** route to main page */}
                <Route exact path="/" component={Home}></Route>
                {/** route to About Page */}
                <Route exact path="/about" component={About}></Route>
                {/** route to a User page */}
                <Route
                  exact
                  path="/user/:login"
                  render={props => <User {...props}></User>}
                ></Route>
                {/** Route to any other non available page */}
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};
export default App;
