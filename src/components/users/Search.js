import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  state = {
    text: ""
  };
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please Enter something", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({
        text: ""
      });
    }
  };
  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users ..."
            onChange={this.onChange}
            value={this.state.text}
            style={{
              borderRadius: 8,
              boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2)"
            }}
          ></input>
          <input type="submit" value="Search" className="btn "></input>
          {showClear && (
            <button className="btn" onClick={clearUsers}>
              Clear
            </button>
          )}
        </form>
      </div>
    );
  }
}
