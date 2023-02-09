import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLesson } from "./singleLessonSlice";
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
  const userId = useSelector((state) => state.auth.me.id);
  const lesson = useSelector((state) => state.singleLesson.lesson);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(createLesson({ name, level, userId: userId }));
  };

  //if the lesson model is changed to include more than 8 keys, this will need to be updated
  useEffect(() => {
    if (lesson) {
      if (Object.keys(lesson).length < 9)
        navigate(`/edit/lessons/${lesson.id}/slides/1`);
    }
  }, [lesson]);

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
