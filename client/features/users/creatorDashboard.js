import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";


import UserLessonsList from "./UserLessonsList";

const CreatorDashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);

  const singleUser = useSelector((state) => state.singleUser);

  //use this to tell lesson.published what to change to
  let lessons = [];
  if (singleUser) lessons = singleUser.lessons;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  return (
    <div>
      <h1>Creator Dashboard</h1>
      <div>
            <Link to="/create-lesson">
              <Button>Create New Lesson</Button>
            </Link>
          </div>
      {lessons && lessons.length ? (
        <UserLessonsList lessons={lessons} userId={userId} />
      ) : (
        "No Lessons At All!"
      )}
    </div>
  );
};

export default CreatorDashboard;
