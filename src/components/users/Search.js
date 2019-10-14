import React, { useState } from "react";
import PropTypes from "prop-types";

/// Search component using useState Hook ;
const Search = ({ searchUsers, setAlert, showClear, clearUsers }) => {
  const [text, setText] = useState(""); /// useState returns an array containing the param we want to use as state and a method to modify it
  /// in this case : text the value entered , setText the method to modify it in onChange and onSubmit
  const onChange = e => {
    setText(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please Enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users ..."
          onChange={onChange}
          value={text}
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
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};
export default Search;
