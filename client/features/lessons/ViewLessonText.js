import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSlideText } from "./singleLessonSlice";

const ViewLessonText = ({ slide }) => {
  if (slide)
    return (
      <div>
        <Typography><pre>{slide.text}</pre></Typography>
      </div>
    );
};

export default ViewLessonText;
