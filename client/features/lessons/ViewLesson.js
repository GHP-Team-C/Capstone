import React, { useEffect, useState } from "react";
import ViewPianoKeys from "./ViewPianoKeys";
import {
  Box,
  Stack,
  Typography,
  Pagination,
  Button,
  Popper,
  Popover,
} from  "@mui/material";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
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
import PlayerPiano from "./PlayerPiano";
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

const ViewLesson = () => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.singleLesson.lesson);
  const slide = useSelector((state) => state.singleLesson.slide);
  const [activeElement, setActiveElement] = useState({
    idx: -1,
    id: -1,
    note: "",
    octave: "",
    duration: "",
  });
  const navigate = useNavigate();

  let { lId } = useParams();
  //use sId as an index # in the singleLesson.lesson.slides array
  let { sId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleLesson(lId));
  }, [sId]);

  useEffect(() => {
    setActiveElement({
      idx: -1,
      id: -1,
      note: "",
      octave: "",
      triad: "",
      duration: "",
    });
  }, [slide]);

  useEffect(() => {
    if (lesson) {
      dispatch(fetchSingleSlide(lesson.slides[sId - 1].id));
    }
  }, [lesson]);

  const [anchorEl, setAnchorEl] = useState(null);


  const handleClick = async (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "player-popper" : undefined;

  const handlePageChange = (event, value) => {
    navigate(`/lessons/${lId}/slides/${value}`);
  };



  if (lesson)
    return (
      <>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            aria-describedby={id}
            type="button"
            onClick={handleClick}
          >
            Player Piano
          </Button>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              {
                <PlayerPiano
                  sampler={sampler}
                  open={open}
                  setAnchorEl={setAnchorEl}
                />
              }
            </Box>
          </Popper>
        </Box>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <h1>{lesson.name}</h1>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="space-evenly" alignItems="center">
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
            <Typography sx={{ p: 2 }}>This is a Staff - a common form of notation to display musical notes. Click on a note to hear the sound!</Typography>
          </Popover>
        </div>
      )}
    </PopupState>
          <ViewMusicalStaff
            slide={slide}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            sampler={sampler}
          />
          <ViewPianoKeys slide={slide} activeElement={activeElement} />

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
            <Box>
              <ul>
            <Typography sx={{ p: 2 }}>
                <li>The Piano Display shows the notes that are selected on the Staff - Click a different note on the staff to see the keyboard change!</li>
                <li>The Player Piano on the top of the screen allows you to practice if you don't have a piano at home. Keys S D F G H J K L on your keyboard will play the notes C D E F G A B C D on the piano. E R Y U I will play sharps, caps-lock will raise an octave, and holding the control key will engage the pedal. Try plucking out a tune!</li></Typography>
                </ul>
                </Box>
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
          <ViewLessonText slide={slide} />
        </Box>
        <Box
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
          sx={{ position: "fixed", bottom: 25, left: 0, right: 0 }}
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
