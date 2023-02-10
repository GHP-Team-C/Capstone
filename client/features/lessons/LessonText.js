import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSlideText } from "./singleLessonSlice";
import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";

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
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  return (
    <div>
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
      <Save onClick={saveText} style={{ cursor: "pointer" }} />
      {isAlertVisible && <Typography>Lesson Instructions Saved ✓</Typography>}
    </div>
  );
};

export default LessonText;
