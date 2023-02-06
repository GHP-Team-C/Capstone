import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLesson } from "./lessonsSlice";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
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
    <form id="create-lesson" onSubmit={handleSubmit} sx={{ m: 2 }}>
      <TextField
        label="Lesson Name"
        value={name}
        variant="outlined"
        sx={{ m: 2 }}
        style={{ width: 250 }}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <Button type="submit" color="primary" variant="contained" sx={{ m: 2 }}>
        Create
      </Button>
    </form>
  );
};

export default CreateLesson;
