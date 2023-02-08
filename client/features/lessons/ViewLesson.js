import React, { useEffect, useState } from "react";
import ViewPianoKeys from "./ViewPianoKeys";
import { Box, Stack, Button, Popper } from "@mui/material";
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
  //figure out how to check that the sampler is loaded
  // const sampler = new Tone.Sampler({
  //   urls: {
  //     A3: "a3.mp3",
  //     A4: "a4.mp3",
  //     "A#3": "aShrp3.mp3",
  //     "A#4": "aShrp4.mp3",
  //     B3: "b3.mp3",
  //     B4: "b4.mp3",
  //     C3: "c3.mp3",
  //     C4: "c4.mp3",
  //     "C#3": "cShrp3.mp3",
  //     "C#4": "cShrp4.mp3",
  //     D3: "d3.mp3",
  //     D4: "d4.mp3",
  //     "D#3": "dShrp3.mp3",
  //     "D#4": "dShrp4.mp3",
  //     E3: "e3.mp3",
  //     E4: "e4.mp3",
  //     F3: "f3.mp3",
  //     F4: "f4.mp3",
  //     "F#3": "fShrp3.mp3",
  //     "F#4": "fShrp4.mp3",
  //     g3: "g3.mp3",
  //     g4: "g4.mp3",
  //     "G#3": "gShrp3.mp3",
  //     "G#4": "gShrp4.mp3",
  //   },
  //   baseUrl: "/pianoSamples/",
  // }).toDestination();

  const sampler = new Tone.PolySynth(Tone.Synth).toDestination();

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
    await Tone.start();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  if (lesson)
    return (
      <>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <button aria-describedby={id} type="button" onClick={handleClick}>
            Player Piano
          </button>
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              {<PlayerPiano sampler={sampler} />}
            </Box>
          </Popper>
        </Box>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <h1>{lesson.name}</h1>
        </Box>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <h4>
            Slide {sId} of {lesson.slides.length}
          </h4>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="space-evenly">
          <ViewMusicalStaff
            slide={slide}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            sampler={sampler}
          />
          <ViewPianoKeys slide={slide} activeElement={activeElement} />
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
