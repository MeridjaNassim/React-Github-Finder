import React, { Component } from "react";
import "./App.css";
import About from "./components/pages/About";
import NavBar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  /// searches of github user .
  searchUsers = async text => {
    this.setState({
      loading: true
    });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };
  /// getting a single user
  getUser = async username => {
    /// used to be able to show the spinner
    this.setState({
      loading: true
    });
    /// requesting user of username (username) info from github exp : ".com/users/MeridjaNassim?"
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    /// once data is aquired we set user object in state to the data within response (res) , and loading to false to stop spinner
    this.setState({ user: res.data, loading: false });
  };
  /// getCalled when user page is loaded to get the first 5 repos of the user by created ordrer
  getUsersRepos = async username => {
    this.setState({
      loading: true
    });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      repos: res.data,
      loading: false
    });
  };
  /// clears users grid once clicked on button clear
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };
  /// sets the alert object in state with corresponding text and type , gets called by the search if search button was clicked without passing text first,
  setAlert = (text, type) => {
    this.setState({
      alert: {
        msg: text,
        type: type
      }
    });
    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 5000);
  };
  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar title=" Github Finder" icon="fab fa-github"></NavBar>
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              {/** route to main page */}
              <Route
                exact
                path="/"
                render={props => {
                  return (
                    <>
                      <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={this.getUsersRepos}
                    repos={repos}
                  ></User>
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
