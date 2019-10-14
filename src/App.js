import React, { useState } from "react";
import "./App.css";
import About from "./components/pages/About";
import NavBar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlertState] = useState(null);

  /// searches of github user .
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };
  /// getting a single user
  const getUser = async username => {
    /// used to be able to show the spinner
    setLoading(true);
    /// requesting user of username (username) info from github exp : ".com/users/MeridjaNassim?"
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    /// once data is aquired we set user object in state to the data within response (res) , and loading to false to stop spinner
    setUser(res.data);
    setLoading(false);
  };
  /// getCalled when user page is loaded to get the first 5 repos of the user by created ordrer
  const getUsersRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };
  /// clears users grid once clicked on button clear
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
  /// sets the alert object in state with corresponding text and type , gets called by the search if search button was clicked without passing text first,
  const setAlert = (text, type) => {
    setAlertState({
      msg: text,
      type: type
    });
    setTimeout(() => {
      setAlertState(null);
    }, 5000);
  };

  return (
    <Router>
      <div className="App">
        <NavBar title=" Github Finder" icon="fab fa-github"></NavBar>
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            {/** route to main page */}
            <Route
              exact
              path="/"
              render={props => {
                return (
                  <>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={setAlert}
                    ></Search>
                    <Users loading={loading} users={users}></Users>
                  </>
                );
              }}
            ></Route>
            {/** route to About Page */}
            <Route exact path="/about" component={About}></Route>
            {/** route to a User page */}
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={getUsersRepos}
                  repos={repos}
                ></User>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};
export default App;
