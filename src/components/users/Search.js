import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";
/// Search component using useState Hook ;
const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
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
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search for users ..."
          onChange={onChange}
          value={text}
          style={{
            borderRadius: 8,
            boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2)"
          }}
        ></input>

        <input type="submit" value="Search" className="btn "></input>

        {githubContext.users.length > 0 && (
          <button className="btn" onClick={githubContext.clearUsers}>
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
