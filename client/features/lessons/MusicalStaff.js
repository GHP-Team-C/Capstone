import React, { useEffect, useState } from "react";
import * as Vex from "vexflow";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffNotes, updateStaffNote } from "./singleLessonSlice";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";

const MusicalStaff = ({ slide }) => {
  const [note, setNote] = useState("");
  const [triad, setTriad] = useState("")
  const [octave, setOctave] = useState("");
  const [duration, setDuration] = useState("q");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleOctaveChange = (event) => {
    setOctave(event.target.value);
  };

  const handleTriadChange = (event) => {
    setTriad(event.target.value)
  }

  const noteArray = ["c", "d", "e", "f", "g", "a", "b"];
  const triadArray = ["C Maj", "D Min", "E Min", "F Maj", "G Maj", "A Min", "B Dim"]
  const triadNotes = {
    "C Maj": {notes: "ceg", octaves: "444"},
    "D Min": {notes: "dfa", octaves: "444"},
    "E Min": {notes: "egb", octaves: "444"},
    "F Maj": {notes: "fac", octaves: "445"},
    "G Maj": {notes: "gbd", octaves: "445"},
    "A Min": {notes: "ace", octaves: "455"},
    "B Dim": {notes: "bdf", octaves: "455"},
  }
  const octaveArray = ["1", "2", "3", "4", "5", "6", "7"];
  const { Renderer, Stave, Formatter, StaveNote, Voice } = Vex.Flow;

  let div = document.getElementById("staffDiv");

  const dispatch = useDispatch();

  useEffect(() => {
    if (slide) dispatch(fetchStaffNotes(slide.staff.id));
  }, [slide]);

  const lesson = useSelector((state) => state.singleLesson.notes);

  const [activeElement, setActiveElement] = useState({
    idx: -1,
    id: -1,
    note: "",
    triad: "",
    octave: "",
    duration: "",
  });
  const [toChange, setToChange] = useState(false);
  const notes = [];

  useEffect(() => {
    setToChange(true);
  }, [note, triad, octave, duration]);

  useEffect(() => {
    setToChange(false);
  }, []);

  const updateNote = async () => {
    await dispatch(
      updateStaffNote({
        id: slide.staff.id,
        note: {
          id: activeElement.id,
          noteName: note,
          octave: octave,
          duration: duration,
          domId: activeElement.idx + 1,
        },
      })
    );
    setToChange(false);
    if (slide) dispatch(fetchStaffNotes(slide.staff.id));
  };

  const updateTriad = async () => {
    await dispatch(
      updateStaffNote({
        id: slide.staff.id,
        note: {
          id: activeElement.id,
          noteName: triadNotes[triad].notes,
          octave: triadNotes[triad].octaves,
          duration: duration,
          domId: activeElement.idx + 1,
        },
      })
    );
    setToChange(false);
    if (slide) dispatch(fetchStaffNotes(slide.staff.id));
  };

  const drawStaff = () => {
    if (lesson) {
      lesson.map((note) => {
        let formattedNoteName = [];
        for (let i = 0; i < note.noteName.length; i++) {
          formattedNoteName.push(`${note.noteName[i]}/${note.octave[i]}`);
        }
        const newNote = new StaveNote({
          keys: formattedNoteName,
          duration: `${note.duration}`,
        });
        newNote.attrs.id = `note${note.domId}`;
        newNote.attrs.pk = note.id;
        newNote.attrs.noteName = note.noteName[0];
        newNote.attrs.octave = note.octave[0];
        notes.push(newNote);
      });
      let svg = document.getElementById("staff");
      if (svg) {
        const staffDiv = document.getElementById("staffDiv");
        if (svg) staffDiv.removeChild(svg);
      }
      svg = document.getElementById("staff");
      if (div && !svg && lesson.length) {
        const renderer = new Renderer(div, Renderer.Backends.SVG);
        renderer.ctx.element.children[0].setAttribute("id", "staff");

        // Configure the rendering context.
        renderer.resize(500, 200);
        const context = renderer.getContext();

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const stave = new Stave(10, 40, 400);

        // Add a clef and time signature.
        stave.addClef("treble").addTimeSignature("4/4");

        // Connect it to the rendering context and draw!
        stave.setContext(context).draw();

        // Create a voice in 4/4 and add above notes
        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(notes);

        // Format and justify the notes to 400 pixels.
        new Formatter().joinVoices([voice]).format([voice], 350);

        // Render voice
        voice.draw(context, stave);
      }
    }
  };

  const addNoteListeners = () => {
    if (notes.length) {
      notes.forEach((note, idx) => {
        const noteSVG = document.getElementById(`vf-note${idx + 1}`);
        if (noteSVG) {
          noteSVG.addEventListener("click", () => {
            setDuration("q");
            setActiveElement({
              idx: idx,
              id: note.attrs.pk,
              noteName: note.attrs.noteName,
              octave: note.attrs.octave,
            });
          });
        }
      });
    }
  };

  useEffect(() => {
    if (activeElement.idx > -1 && toChange && slide) {
      if (activeElement.triad !== ""){
        updateTriad()
      } else
        {
         updateNote();
        }
    }
    else drawStaff();
    if (notes.length) addNoteListeners();
  }, [notes]);

  useEffect(() => {
    if (activeElement.noteName) {
      setNote(activeElement.noteName);
      setOctave(activeElement.octave);
    }
  }, [activeElement]);

  useEffect(() => {
    notes.forEach((note, idx) => {
      const noteSVG = document.getElementById(`vf-note${idx + 1}`);
      if (note.attrs.pk === activeElement.id) {
        noteSVG.setAttribute("fill", "orange");
        noteSVG.setAttribute("stroke", "orange");
      }
    });
  }, [activeElement, notes]);

  const restHandler = () => {
    if (duration === "qr") setDuration("q");
    else {
      setNote("b");
      setOctave("4");
      setDuration(`qr`);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-note">Note</InputLabel>
        <Select
          labelId="select-note"
          id="select-note"
          value={note}
          label="note"
          onChange={handleNoteChange}
        >
          {noteArray.map((note) => (
            <MenuItem key={note} value={note}>
              {note}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-triad">Triad</InputLabel>
        <Select
          labelId="select-triad"
          id="select-triad"
          value={triad}
          label="triad"
          onChange={handleTriadChange}
        >
          {triadArray.map((triad) => (
            <MenuItem key={triad} value={triad}>
              {triad}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-octave">Octave</InputLabel>
        <Select
          labelId="select-octave"
          id="select-octave"
          value={octave}
          label="octave"
          onChange={handleOctaveChange}
        >
          {octaveArray.map((octave) => (
            <MenuItem key={octave} value={octave}>
              {octave}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={restHandler}>Rest</Button>
      <div id="staffDiv"></div>
    </div>
  );
};

export default MusicalStaff;
