import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";
import { Button } from "@mui/material";
import { publishStatusSingleLesson } from "../lessons/singleLessonSlice";
import UserLessonsList from "./UserLessonsList";

const CreatorDashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);

  const singleUser = useSelector((state) => state.singleUser);

  //use this to tell lesson.published what to change to

  const lessons = singleUser.lessons;


  useEffect(() => {
    dispatch(fetchSingleUser(userId));

  }, [dispatch]);



  return (
    <div>
      <h1>Creator Dashboard</h1>
      {lessons && lessons.length?
      <UserLessonsList lessons={lessons}/> : 'No Lessons At All!'
      }

    </div>
  );
};

export default CreatorDashboard;
