import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);

  const singleUser = useSelector((state) => state.singleUser);
  const { username, email, firstName, lastName, avatarUrl } = singleUser;

  const lessons = singleUser.lessons;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  return (
    <div>
      <h1>User Profile</h1>
      <p>
        Name: {firstName} {lastName}
      </p>
      <img src={avatarUrl} height='200px'/>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <Link to="/creator-dashboard">Creator Dashboard</Link>
    </div>
  );
};

export default UserProfile;
