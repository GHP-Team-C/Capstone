import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSlideText } from "./singleLessonSlice";
import { TextareaAutosize } from "@mui/material";
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
      <label htmlFor="lessonText">Lesson Instructions</label>
      <ClickAwayListener onClickAway={saveText}>
        <TextareaAutosize
          rows="20"
          cols="50"
          id="lessonText"
          name="lessonText"
          onChange={handleChange}
          value={text}
        ></TextareaAutosize>
      </ClickAwayListener>
    </div>
  );
};

export default LessonText;
