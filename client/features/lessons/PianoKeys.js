import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Instrument } from "piano-chart";

const PianoKeys = ({ pianoNotes }) => {
  /*const pianoContainer = document.createElement("div");
  pianoContainer.setAttribute("id", "container");
  document.body.appendChild(pianoContainer);*/

  let pianoDiv = document.getElementById("pianoDiv");

  useEffect(() => {
    pianoDiv = document.getElementById("pianoDiv");
  }, [pianoNotes]);

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
    const pianoSVG = document.getElementById("piano");
    if (pianoDiv && !pianoSVG) {
      const piano = new Instrument(document.getElementById("pianoDiv"), {
        startOctave: 3,
        endOctave: 5,
      });

      // console.log("notes: ", pianoNotes);

      // console.log("piano : ", piano.container.children);

      piano.create();
      piano.addKeyMouseDownListener((note) => {
        let fullNote = "";
        if (note.accidental)
          fullNote = `${note.note.toLowerCase()}${note.accidental}${
            note.octave
          }`;
        else fullNote = `${note.note.toLowerCase()}${note.octave}`;
        if (pianoKeyboard[`${fullNote}`]) {
          piano.keyUp(note);
          pianoKeyboard[`${fullNote}`] = false;
        } else {
          piano.keyDown(note);
          pianoKeyboard[`${fullNote}`] = true;
        }
      });
      piano.container.children[0].setAttribute("id", "piano");
      pianoNotes.forEach((note) => {
        piano.keyDown(`${note}`);
        pianoKeyboard[note] = true;
      });
    }
  }, [pianoDiv, pianoNotes]);

  //this below is a place holder for the controls
  const [note, setNote] = useState("c");

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div>
      {/* this below is a place holder for the controls */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Note</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={note}
          label="note"
          onChange={handleChange}
        >
          {noteArray.map((note) => (
            <MenuItem key={note} value={note}>
              {note}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div id="pianoDiv"></div>
    </div>
  );
};

export default PianoKeys;
