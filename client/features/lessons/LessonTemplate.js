import React, { useEffect, useState } from "react";
import PianoKeys from "./PianoKeys";
import {
  Box,
  Stack,
  Button,
  Typography,
  Pagination,
  BottomNavigation,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import LessonText from "./LessonText";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleLesson,
  fetchStaffNotes,
  makeSlide,
  fetchSingleSlide,
  publishStatusSingleLesson,
  deleteLessonAsync,
  deleteSlideAsnyc,
  updateLessonTitle,
} from "./singleLessonSlice";
import { useParams } from "react-router-dom";
import MusicalStaff from "./MusicalStaff";
import { NavLink, useNavigate } from "react-router-dom";

const LessonTemplate = () => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.singleLesson.lesson);
  const slide = useSelector((state) => state.singleLesson.slide);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  let { lId } = useParams();
  //use sId as an index # in the singleLesson.lesson.slides array
  let { sId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleLesson(lId));
  }, [sId]);

  useEffect(() => {
    if (lesson) setTitle(lesson.name);
  }, [lesson]);

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

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const saveTitle = () => {
    dispatch(updateLessonTitle({ id: lesson.id, title: { name: title } }));
  };

  const togglePublishStatus = async () => {
    await dispatch(publishStatusSingleLesson(lesson.id));
    if (!lesson.published) navigate("/creator-dashboard");
  };

  const handlePageChange = (event, value) => {
    navigate(`/edit/lessons/${lId}/slides/${value}`);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (toDelete === "lesson") {
      await dispatch(deleteLessonAsync(lesson.id));
      setOpen(false);
      navigate("/creator-dashboard");
    } else {
      await dispatch(deleteSlideAsnyc(slide.id));
      setOpen(false);
      dispatch(fetchSingleLesson(lId));
      if (sId == lesson.slides.length)
        navigate(`/edit/lessons/${lId}/slides/${Number(sId) - 1}`);
    }
  };

  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState("");

  const handleOpen = (toBeDeleted) => {
    setOpen(true);
    setToDelete(toBeDeleted);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (lesson && Object.keys(lesson).length > 8)
    return (
      <>
        <textarea
          id="name"
          name="name"
          style={{ fontSize: "24px" }}
          onChange={handleChange}
          value={title}
        ></textarea>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        ></Stack>
        <Button onClick={saveTitle}>Save Title</Button>
        <Button variant="text" onClick={togglePublishStatus}>
          {lesson.published ? "Unpublish Lesson" : "Publish Lesson"}
        </Button>
        <Button variant="text" onClick={() => handleOpen("lesson")}>
          Delete Lesson
        </Button>
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
            {lesson.slides.length > 1 && (
              <Button variant="contained" onClick={() => handleOpen("slide")}>
                Delete Slide
              </Button>
            )}
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

          {open && (
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Your{" "}
                  {toDelete === "lesson" ? `lesson ${lesson.name}` : `slide`}{" "}
                  cannot be recovered once deleted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleDelete}>Yes, Delete</Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
        <Stack direction="row" justifyContent="end">
          <NavLink to={"/creator-dashboard"}>
            <Button variant="contained">Done Editing</Button>
          </NavLink>
        </Stack>
      </>
    );
};

export default LessonTemplate;
