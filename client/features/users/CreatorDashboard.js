import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Typography, Box } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";
import { black, grey } from "@mui/material/colors";
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
      <ButtonGroup variant="text" size="large">
        <Link to="/user-profile">
          <Button sx={{ color: "grey" }}>User Profile</Button>
        </Link>
        <Button
          sx={{ color: "black", "&:hover": { backgroundColor: "transparent" } }}
          style={{ cursor: "default" }}
        >
          Creator Dashboard
        </Button>
      </ButtonGroup>
      <div>
        <Box m={3}>
          <Link to="/create-lesson">
            <Button startIcon={<ControlPoint />} variant="contained" m={2}>
              Create New Lesson
            </Button>
          </Link>
        </Box>
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
