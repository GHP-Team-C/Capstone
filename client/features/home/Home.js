import React from 'react';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';


/**
 * COMPONENT
 */
const Home = () => {
const navigate = useNavigate();
const redirectToLesson = () => {
  navigate("/lesson")
}

  return (
    <div className='landing'>
      <Stack justifyContent="center"
  alignItems="center" spacing={2}>
      <Typography variant="h3">
        Welcome to AugmentED!
      </Typography>
          <Typography variant="h4"> Learn to play music!</Typography>
          <Button onClick={redirectToLesson}> Start Lesson</Button>

      </Stack>
    </div>
  );
};

export default Home;
