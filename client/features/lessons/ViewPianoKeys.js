import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Instrument } from "piano-chart";
import { useDispatch, useSelector } from "react-redux";
import { updatePiano, fetchPiano } from "./singleLessonSlice";

const ViewPianoKeys = ({ slide }) => {
  let pianoDiv = document.getElementById("pianoDiv");
  const thisPiano = useSelector((state) => state.singleLesson.piano);
  let pianoNotes = [];
  if (thisPiano) pianoNotes = thisPiano.keys.split(", ");
  const dispatch = useDispatch();

  useEffect(() => {
    if (slide) dispatch(fetchPiano(slide.piano.id));
  }, [slide]);

  useEffect(() => {
    pianoDiv = document.getElementById("pianoDiv");
  }, [thisPiano]);

  const noteArray = ["c", "d", "e", "f", "g", "a", "b"];
  const octaveArray = ["1", "2", "3", "4", "5", "6", "7"];
  const pianoKeyboard = {};
  noteArray.forEach((note) => {
    octaveArray.forEach((octave) => {
      pianoKeyboard[`${note}${octave}`] = false;
      pianoKeyboard[`${note}#${octave}`] = false;
    });
  });

  useEffect(() => {
    pianoCreator();
  }, [pianoDiv, pianoNotes]);

  const pianoCreator = () => {
    let pianoSVG = document.getElementById("piano");
    if (pianoSVG) {
      const pianoSvg = document.getElementById("piano");
      const pianoDiv = document.getElementById("pianoDiv");
      if (pianoSvg) pianoDiv.removeChild(pianoSvg);
    }
    pianoSVG = document.getElementById("piano");
    if (pianoDiv && !pianoSVG && thisPiano) {
      const piano = new Instrument(document.getElementById("pianoDiv"), {
        startOctave: 2,
        endOctave: 6,
      });

      piano.create();
      piano.container.children[0].setAttribute("id", "piano");
      piano.applySettings({ vividKeyPressColor: "#ffa500" });
      piano.applySettings({ keyPressStyle: "vivid" });
      pianoNotes.forEach((note) => {
        if (note) {
          piano.keyDown(`${note}`);
          pianoKeyboard[note] = true;
        }
      });
    }
  };

  const pianoStyle = {
    marginTop: "55px",
    width: "500px",
  };

  return (
    <div>
      <div id="pianoDiv" style={pianoStyle}></div>
    </div>
  );
};

export default ViewPianoKeys;
