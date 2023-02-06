import React, { useEffect, useState } from "react";
import PianoKeys from "./PianoKeys";
import { Box, Stack, Button } from "@mui/material";
import LessonText from "./LessonText";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleLesson,
  fetchStaffNotes,
  makeSlide,
  fetchSingleSlide,
} from "./singleLessonSlice";
import { useParams } from "react-router-dom";
import MusicalStaff from "./MusicalStaff";
import { NavLink, useNavigate } from "react-router-dom";

const LessonTemplate = () => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.singleLesson.lesson);
  const slide = useSelector((state) => state.singleLesson.slide);
  const navigate = useNavigate();


  let { lId } = useParams();
  //use sId as an index # in the singleLesson.lesson.slides array
  let { sId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleLesson(lId));
  }, [sId]);

  useEffect(() => {
    if (lesson) {
      dispatch(fetchSingleSlide(lesson.slides[sId - 1].id));
    }
  }, [lesson]);



  const handleAddSlide = async () => {
     await dispatch(makeSlide(lId))

    navigate(`/lessons/${lId}/slides/${Number(sId)+1}`)
  }



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

        <LessonText />
{ sId != 1 &&
      <NavLink to={`/lessons/${lId}/slides/${Number(sId)-1}`}>
        <Button variant="contained" >
          Previous Slide
        </Button>
        </NavLink>
}
{ lesson ? lesson.slides[Number(sId)] ?
      <NavLink to={`/lessons/${lId}/slides/${Number(sId)+1}`}>
        <Button variant="contained" >
          Next Slide
        </Button>
      </NavLink>
        :
        <Button variant="contained" onClick={handleAddSlide}>
          Add Another Slide
        </Button>
        : null
}
        <Button variant="contained" onClick={handleClick}>
          Publish
        </Button>

        

        <LessonText slide={slide} />

      </Box>
    </>
  );
};

export default LessonTemplate;
