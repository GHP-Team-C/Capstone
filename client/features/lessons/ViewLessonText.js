import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSlideText } from "./singleLessonSlice";

const ViewLessonText = ({ slide }) => {
  if (slide)
    return (
      <div>
        <Typography>{slide.text}</Typography>
      </div>
    );
};

export default ViewLessonText;
