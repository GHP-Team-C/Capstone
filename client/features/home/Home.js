import React from 'react';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { Typography } from '@mui/material'


/**
 * COMPONENT
 */
const Home = () => {

  return (
    <div className='landing'>
      <Stack justifyContent="center"
  alignItems="center" spacing={2}>
      <Typography variant="h3">
        Welcome to AugmentED!
      </Typography>
          <Typography variant="h4"> Learn to play music!</Typography>
          <Button> Start Lesson</Button>

      </Stack>
    </div>
  );
};

export default Home;
