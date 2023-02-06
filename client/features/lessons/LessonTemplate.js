import React, { useEffect, useState } from "react";
import PianoKeys from "./PianoKeys";
import { Box, Stack, Button } from "@mui/material";
import LessonText from "./LessonText";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleLesson,
  fetchStaffNotes,
  fetchSingleSlide,
} from "./singleLessonSlice";
import { useParams } from "react-router-dom";
import MusicalStaff from "./MusicalStaff";

const LessonTemplate = () => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.singleLesson.lesson);
  const slide = useSelector((state) => state.singleLesson.slide);

  let { lId } = useParams();
  //use sId as an index # in the singleLesson.lesson.slides array
  let { sId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleLesson(lId));
  }, [dispatch]);

  useEffect(() => {
    if (lesson) {
      dispatch(fetchSingleSlide(lesson.slides[sId - 1].id));
    }
  }, [lesson]);

  return (
    <>
      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <h1> Lessons Template </h1>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <MusicalStaff slide={slide} />
        <PianoKeys slide={slide} />
      </Stack>

      <Box
        m={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <LessonText slide={slide} />
      </Box>
    </>
  );
};

export default LessonTemplate;
