import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLesson } from "./lessonsSlice";
import {
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
} from "@mui/material";

const CreateLesson = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("beginner");
  const [visibleTo, setVisibleTo] = useState("private");
  const userId = useSelector((state) => state.auth.me.id);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createLesson({ name, level, userId: userId }));
    console.log("clicked!");
  };

  return (
    <div>
      <Typography sx={{ m: 2 }}>Create A New Lesson</Typography>
      <form id="create-lesson" onSubmit={handleSubmit} sx={{ m: 2 }}>
        <Stack direcion="row" spacing={2}>
          <FormControl>
            <FormLabel>Lesson Name</FormLabel>
            <TextField
              label="Lesson Name"
              value={name}
              variant="outlined"
              sx={{ m: 2 }}
              style={{ width: 250 }}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FormLabel>Level</FormLabel>
            <RadioGroup row onChange={(e) => setLevel(e.target.value)}>
              <FormControlLabel
                value="beginner"
                control={<Radio required={true} />}
                label="Beginner"
              />
              <FormControlLabel
                value="intermediate"
                control={<Radio required={true} />}
                label="Intermediate"
              />
              <FormControlLabel
                value="advanced"
                control={<Radio required={true} />}
                label="Advanced"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Visibility</FormLabel>
            <RadioGroup row onChange={(e) => setVisibleTo(e.target.value)}>
              <FormControlLabel
                value="Private"
                control={<Radio required={true} />}
                label="Private"
              />
              <FormControlLabel
                value="Public"
                control={<Radio required={true} />}
                label="Public"
              />
              <FormControlLabel
                value="Organization"
                control={<Radio required={true} />}
                label="Organization"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ m: 2, width: 300 }}
          >
            Create Lesson
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default CreateLesson;
