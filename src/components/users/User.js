import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
export default class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      company,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hierable
    } = this.props.user;
    const { loading } = this.props;
    const { repos } = this.props;
    if (loading) return <Spinner />;

    return (
      <>
        <Link to="/" className="btn">
          Back to Search
        </Link>

        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="avatar"
              className="round-img"
              style={{
                width: 150
              }}
            />
            <h1>{name}</h1>
            <p>
              <i
                className="fas fa-map-marker-alt"
                style={{
                  color: "#358bdc"
                }}
              ></i>{" "}
              Location : {location ? location : "N/A"}
            </p>
          </div>
          <div className="center">
            {bio && (
              <>
                <h3>Bio</h3>
                <p>{bio}</p>
              </>
            )}
            <p>
              <strong>Hierable</strong>{" "}
              {hierable ? (
                <i className="fas fa-check text-success"></i>
              ) : (
                <i className="fas fa-times-circle text-danger"></i>
              )}
            </p>
            <a href={html_url} className="btn my-1">
              Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <>
                    <strong>Username:</strong> {login}
                  </>
                )}
              </li>
              <li>
                {company && (
                  <>
                    <strong>Company:</strong> {company}
                  </>
                )}
              </li>
              <li>
                {blog && (
                  <>
                    <strong>website:</strong>
                    <a href={blog}> {blog}</a>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers : {followers}</div>
          <div className="badge badge-success">Following : {following}</div>
          <div className="badge badge-light">Public repos : {public_repos}</div>
          <div className="badge badge-dark">Public gists : {public_gists}</div>
        </div>
        <Repos repos={repos}></Repos>
      </>
    );
  }
}
