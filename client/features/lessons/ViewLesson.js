import React, { useEffect, useState } from "react";
import ViewPianoKeys from "./ViewPianoKeys";
import { Box, Stack, Button } from "@mui/material";
import ViewLessonText from "./ViewLessonText";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleLesson,
  fetchStaffNotes,
  fetchSingleSlide,
} from "./singleLessonSlice";
import { useParams } from "react-router-dom";
import ViewMusicalStaff from "./ViewMusicalStaff";
import { NavLink, useNavigate } from "react-router-dom";

const ViewLesson = () => {
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

  if (lesson)
    return (
      <>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <h1>{lesson.name}</h1>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="space-evenly">
          <ViewMusicalStaff slide={slide} />
          <ViewPianoKeys slide={slide} />
        </Stack>

        <Box
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <ViewLessonText slide={slide} />
          {lesson ? (
            lesson.slides[Number(sId)] ? (
              <NavLink to={`/lessons/${lId}/slides/${Number(sId) + 1}`}>
                <Button variant="contained">Next Slide</Button>
              </NavLink>
            ) : null
          ) : null}
          {sId != 1 && (
            <NavLink to={`/lessons/${lId}/slides/${Number(sId) - 1}`}>
              <Button variant="contained">Previous Slide</Button>
            </NavLink>
          )}
        </Box>
      </>
    );
};

export default ViewLesson;