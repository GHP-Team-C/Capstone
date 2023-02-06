import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSlideText } from "./singleLessonSlice";

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
      <textarea
        rows="20"
        cols="50"
        id="lessonText"
        name="lessonText"
        onChange={handleChange}
        value={text}
      ></textarea>
      <Button onClick={saveText}>Save</Button>
    </div>
  );
};

export default LessonText;
