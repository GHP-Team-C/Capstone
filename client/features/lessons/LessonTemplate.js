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
import { publishStatusSingleLesson } from "./singleLessonSlice";

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
      if (Object.keys(lesson).length > 8)
        dispatch(fetchSingleSlide(lesson.slides[sId - 1].id));
    }
  }, [lesson]);

  const handleAddSlide = async () => {
    await dispatch(makeSlide(lId));

    navigate(`/edit/lessons/${lId}/slides/${Number(sId) + 1}`);
  };

  const togglePublishStatus = () => {
    dispatch(publishStatusSingleLesson(lesson.id));
  };

  if (lesson && Object.keys(lesson).length > 8)
    return (
      <>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <h1> Lessons Template </h1>
        </Box>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <h4>Slide {Number(sId)} of {lesson.slides.length}</h4>
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
          {lesson ? (
            lesson.slides[Number(sId)] ? (
              <NavLink to={`/edit/lessons/${lId}/slides/${Number(sId) + 1}`}>
                <Button variant="contained">Next Slide</Button>
              </NavLink>
            ) : (
              <Button variant="contained" onClick={handleAddSlide}>
                Add Another Slide
              </Button>
            )
          ) : null}
          {sId != 1 && (
            <NavLink to={`/edit/lessons/${lId}/slides/${Number(sId) - 1}`}>
              <Button variant="contained">Previous Slide</Button>
            </NavLink>
          )}
          <Button variant="contained" onClick={togglePublishStatus}>
            {lesson.published ? "Unpublish" : "Publish"}
          </Button>
        </Box>
      </>
    );
};

export default LessonTemplate;
