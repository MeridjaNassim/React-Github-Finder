import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";
const Users = () => {
  const githubContext = useContext(GithubContext);
  const { users, loading } = githubContext;
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          // eslint-disable-next-line no-unused-expressions
          <UserItem key={user.id} user={user}></UserItem>
        ))}
      </div>
    );
  }
};

export default Users;

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem"
};
