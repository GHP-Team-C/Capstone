import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Instrument } from "piano-chart";
import { useDispatch, useSelector } from "react-redux";
import { updatePiano, fetchPiano } from "./singleLessonSlice";

const ViewPianoKeys = ({ slide, activeElement }) => {
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
  }, [pianoDiv, pianoNotes, activeElement, slide]);

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
        endOctave: 7.5,
      });

      piano.create();
      piano.container.children[0].setAttribute("id", "piano");

      if (activeElement.idx > -1) {
        piano.applySettings({ vividKeyPressColor: "#ffa500" });
        piano.applySettings({ keyPressStyle: "vivid" });
        if (activeElement.triad !== "") {
          const notes = activeElement.noteName.split("");
          const octaves = activeElement.octave.split("");
          let finalNotes = [];
          for (let i = 0; i < notes.length; i++) {
            finalNotes.push(`${notes[i]}${octaves[i]}`);
          }
          finalNotes.forEach((note) => {
            if (pianoKeyboard[note]) piano.keyUp(note);
            piano.keyDown(note);
          });
        } else {
          if (activeElement.duration !== "qr") {
            const note = `${activeElement.noteName}${activeElement.octave}`;
            if (pianoKeyboard[note]) piano.keyUp(note);
            piano.keyDown(note);
          }
        }
      }
    }
  };

  const pianoStyle = {
    marginTop: "55px",
    width: "600px",
  };

  return (
    <div>
      <div id="pianoDiv" style={pianoStyle}></div>
    </div>
  );
};

export default ViewPianoKeys;
