import React, { useEffect, useState } from "react";
import PianoKeys from "./PianoKeys";
import {
  Box,
  Stack,
  Button,
  Typography,
  Pagination,
  BottomNavigation,
} from "@mui/material";
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
    navigate(`/edit/lessons/${lId}/slides/${lesson.slides.length + 1}`);
  };

  const togglePublishStatus = () => {
    dispatch(publishStatusSingleLesson(lesson.id));
  };

  const handlePageChange = (event, value) => {
    console.log("clicked, value:", value);
    navigate(`/edit/lessons/${lId}/slides/${value}`);
  };

  if (lesson && Object.keys(lesson).length > 8)
    return (
      <>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Stack
            direction="column"
            spacing={-1}
            justifyContent="center"
            alignItems="center"
          >
            <h1>
              {lesson.name} ({lesson.published ? "Published" : "Private"})
            </h1>
            <Button variant="text" onClick={togglePublishStatus}>
              {lesson.published ? "Unpublish" : "Publish"}
            </Button>
          </Stack>
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
          <Stack direction="row" spacing={3} justifyContent="center">
            <Button variant="contained" onClick={handleAddSlide}>
              Add Another Slide
            </Button>
          </Stack>
        </Box>
        <Box
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
          sx={{ position: "fixed", bottom: 25, left: 0, right: 0 }}
        >
          <BottomNavigation>
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
          </BottomNavigation>
        </Box>
      </>
    );
};

export default LessonTemplate;
