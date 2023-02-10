import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSlideText } from "./singleLessonSlice";
import { TextareaAutosize, TextField } from "@mui/material";
import { ClickAwayListener } from "@mui/base";

const LessonText = ({ slide }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (slide) setText(slide.text);
  }, [slide]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const saveText = () => {
    dispatch(updateSlideText({ id: slide.id, text: { text: text } }));
  };

  return (
    <div>
      <ClickAwayListener onClickAway={() => {}}>
        <TextField
          required
          id="lessonText"
          name="lessonText"
          label="Lesson Instructions"
          onChange={handleChange}
          value={text}
          variant="outlined"
          multiline
          rows={10}
          sx={{ width: 700 }}
        />
      </ClickAwayListener>
    </div>
  );
};

export default LessonText;
