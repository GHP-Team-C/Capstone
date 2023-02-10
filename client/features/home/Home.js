import React, {useState} from "react";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CreateLesson from "../lessons/CreateLesson";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  return (
    <div className="landing">
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <Typography variant="h3">Welcome to <span id="augment">augment</span><span id="ed">Ed</span><span id="augmentedNote">♫⁺</span></Typography>
        <Typography variant="h4"> Learn to play music!</Typography>
        <Link to="/all-public-lessons">
          <Button>Browse All Public Lessons</Button>
        </Link>
        {isLoggedIn ? (
          <div>
            <Link to="/create-lesson">
              <Button>Create New Lesson</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Typography>
              Want to create a lesson? <Link to="login">Log In</Link> or{" "}
              <Link to="/signup">Sign Up</Link> to get started.
            </Typography>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default Home;
