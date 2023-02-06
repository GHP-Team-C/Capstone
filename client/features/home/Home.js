import React from "react";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import { Typography, Link } from "@mui/material";
import { useSelector } from "react-redux";
import CreateLesson from "../lessons/CreateLesson";

/**
 * COMPONENT
 */
const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  return (
    <div className="landing">
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <Typography variant="h3">Welcome to AugmentED!</Typography>
        <Typography variant="h4"> Learn to play music!</Typography>
        <Button href="/all-public-lessons">Browse All Lessons</Button>
        {isLoggedIn ? (
          <div>
            <Button href="/create-lesson">Create New Lesson</Button>
          </div>
        ) : (
          <div>
            <Typography>
              Want to create a lesson? <Link href="login">Log In</Link> or{" "}
              <Link href="/signup">Sign Up</Link> to get started.
            </Typography>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default Home;
