import React, { useEffect, useState } from "react";
import ViewPianoKeys from "./ViewPianoKeys";
import {
  Box,
  Stack,
  Button,
  Typography,
  Pagination,
  BottomNavigation,
} from "@mui/material";
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

  const handlePageChange = (event, value) => {
    console.log("clicked, value:", value);
    navigate(`/lessons/${lId}/slides/${value}`);
  };

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
        </Box>
        <Box
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
          sx={{ position: "fixed", bottom: 50, left: 0, right: 0 }}
        >
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography>
              Slide {Number(sId)} of {lesson.slides.length}
            </Typography>
            <Pagination
              count={lesson.slides.length}
              page={Number(sId)}
              value={Number(sId)}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      </>
    );
};

export default ViewLesson;
