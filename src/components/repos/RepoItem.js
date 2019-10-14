import React from "react";
import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
  const language =
    repo.language !== null && repo.language !== ""
      ? repo.language.toLowerCase()
      : "github";
  return (
    <div className="card ">
      <h3>
        <p>
          <i
            style={{
              fontSize: "1.5em"
            }}
            title={language}
            className={"devicon-" + icons[language] + "-plain colored"}
          ></i>{" "}
          <a href={repo.html_url}> {repo.name}</a>
        </p>
      </h3>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
const icons = {
  javascript: "javascript",
  java: "java",
  cplusplus: "cplusplus",
  "c#": "csharp",
  c: "c",
  github: "github",
  dart: "google",
  python: "python",
  css: "css"
};
