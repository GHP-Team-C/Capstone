import React, { useEffect, useState } from "react";
import PianoKeys from "./PianoKeys";
import { Box, Stack, Button } from "@mui/material";
import StaffForm from "./StaffForm";
import LessonText from "./LessonText";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleLesson, fetchStaffNotes } from "./singleLessonSlice";
import { useParams } from "react-router-dom";

const LessonTemplate = () => {
  const dispatch = useDispatch();
  const [pianoNotes, setPianoNotes] = useState(["c4", "e4", "g4", "b4"]);
  const lesson = useSelector((state) => state.singleLesson.lesson);

  let { lId } = useParams();
  //use sId as an index # in the singleLesson.lesson.slides array
  let { sId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleLesson(lId));
  }, [dispatch]);

  useEffect(() => {
    // dispatch();
  }, [dispatch]);

  const handleClick = () => {
    const pianoSvg = document.getElementById("piano");
    const pianoDiv = document.getElementById("pianoDiv");
    if (pianoSvg) pianoDiv.removeChild(pianoSvg);
    setPianoNotes(["d4", "f4", "a4"]);
  };

  return (
    <>
      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <h1> Lessons Template </h1>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <StaffForm />
        <PianoKeys pianoNotes={pianoNotes} />
      </Stack>

      <Box
        m={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <LessonText />
        <Button variant="contained" onClick={handleClick}>
          Press me!
        </Button>
      </Box>
    </>
  );
};

export default LessonTemplate;
