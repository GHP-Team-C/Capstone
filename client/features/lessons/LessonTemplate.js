import React, { useEffect, useState } from "react";
import PianoKeys from "./PianoKeys";
import {
  Box,
  Stack,
  Button,
  ButtonGroup,
  Typography,
  Pagination,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextareaAutosize,
  TextField,
  Popover,
} from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
  Visibility,
  VisibilityOff,
  Delete,
  RemoveCircleOutline,
  ControlPoint,
  CheckCircleOutline,
} from "@mui/icons-material";
import { ClickAwayListener } from "@mui/base";
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
import * as Tone from "tone";

const sampler = new Tone.Sampler({
  urls: {
    A3: "a3.mp3",
    A4: "a4.mp3",
    "A#3": "aShrp3.mp3",
    "A#4": "aShrp4.mp3",
    B3: "b3.mp3",
    B4: "b4.mp3",
    C3: "c3.mp3",
    C4: "c4.mp3",
    "C#3": "cShrp3.mp3",
    "C#4": "cShrp4.mp3",
    D3: "d3.mp3",
    D4: "d4.mp3",
    "D#3": "dShrp3.mp3",
    "D#4": "dShrp4.mp3",
    E3: "e3.mp3",
    E4: "e4.mp3",
    F3: "f3.mp3",
    F4: "f4.mp3",
    "F#3": "fShrp3.mp3",
    "F#4": "fShrp4.mp3",
    g3: "g3.mp3",
    g4: "g4.mp3",
    "G#3": "gShrp3.mp3",
    "G#4": "gShrp4.mp3",
  },
  baseUrl: "/pianoSamples/",
  onload: () => {
    sampler.loaded = true;
  },
}).toDestination();

const LessonTemplate = () => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.singleLesson.lesson);
  const slide = useSelector((state) => state.singleLesson.slide);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const [activeElement, setActiveElement] = useState({
    idx: -1,
    id: -1,
    note: "",
    triad: "",
    octave: "",
    duration: "",
  });

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
        <Paper elevation={3} m={3} p={2}>
          <Box p={2} align="center">
            <ClickAwayListener onClickAway={saveTitle}>
              <TextField
                required
                id="name"
                name="name"
                label="Lesson Name"
                onChange={handleChange}
                value={title}
                variant="outlined"
                sx={{ width: 500 }}
              />
            </ClickAwayListener>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="space-evenly" alignItems="center">
          <PopupState variant="popover" popupId="demo-popup-popover" >
      {(popupState) => (
        <div>
          <button variant="contained" {...bindTrigger(popupState)}>
            ?
          </button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>This is the Staff Editor - click a note or a rest on the staff to select it, then choose from the dropdown menus to modify the selected note.</Typography>
          </Popover>
        </div>
      )}
    </PopupState>
            <MusicalStaff slide={slide} activeElement={activeElement}
            setActiveElement={setActiveElement}
            sampler={sampler}/>
            <PianoKeys slide={slide} activeElement={activeElement}/>

            <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <button variant="contained" {...bindTrigger(popupState)}>
            ?
          </button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>This is the Piano Display - this handy tool reads the Staff and displays the note or notes that are currently selected. Click around on the Staff to see it in action.</Typography>
          </Popover>

        </div>
      )}
    </PopupState>
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
          <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ p: 2 }}
          >
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
        </Paper>
        <Box
          m={2}
          p={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Stack direction="row" spacing={3} justifyContent="center">
            <Button
              startIcon={<ControlPoint />}
              variant="contained"
              onClick={handleAddSlide}
            >
              Add Slide
            </Button>
            {lesson.slides.length > 1 && (
              <Button
                startIcon={<RemoveCircleOutline />}
                variant="contained"
                onClick={() => handleOpen("slide")}
              >
                Remove Slide
              </Button>
            )}
            {lesson.published ? (
              <Button
                startIcon={<VisibilityOff />}
                variant="contained"
                onClick={togglePublishStatus}
              >
                Unpublish Lesson
              </Button>
            ) : (
              <Button startIcon={<Visibility />} onClick={togglePublishStatus}>
                Publish Lesson
              </Button>
            )}
            <Button
              startIcon={<Delete />}
              variant="contained"
              onClick={() => handleOpen("lesson")}
            >
              Delete Lesson
            </Button>
            <NavLink to={"/creator-dashboard"}>
              <Button startIcon={<CheckCircleOutline />} variant="contained">
                Done Editing Lesson
              </Button>
            </NavLink>
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
      </>
    );
};

export default LessonTemplate;
