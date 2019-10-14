import React, { useReducer } from "react";

import axios from "axios";

import GithubContext from "./githubContext";

import GithubReducer from "./githubReducer";

/// operations
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

let githubClientId;
let githubClientSecret;
if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  /// the global state of the app which contains app level items
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  /// search users
  const setLoading = () => dispatch({ type: SET_LOADING });

  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };
  /// get user

  const getUser = async username => {
    /// used to be able to show the spinner
    setLoading();
    /// requesting user of username (username) info from github exp : ".com/users/MeridjaNassim?"
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    /// once data is aquired we set user object in state to the data within response (res) , and loading to false to stop spinner
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };
  /// get repos
  /// getCalled when user page is loaded to get the first 5 repos of the user by created ordrer
  const getUsersRepos = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };
  /// clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  /// set loading

  /// returning the Provider that will wrap the whole app
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUsersRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
