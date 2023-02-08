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

const ViewMusicalStaff = ({ slide, activeElement, setActiveElement }) => {
  const noteArray = ["c", "d", "e", "f", "g", "a", "b"];
  const octaveArray = ["1", "2", "3", "4", "5", "6", "7"];
  const { Renderer, Stave, Formatter, StaveNote, Voice } = Vex.Flow;

  let div = document.getElementById("staffDiv");

  const dispatch = useDispatch();

  useEffect(() => {
    if (slide) dispatch(fetchStaffNotes(slide.staff.id));
  }, [slide]);

  const lesson = useSelector((state) => state.singleLesson.notes);

  const notes = [];

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
        newNote.attrs.noteName = note.noteName;
        newNote.attrs.octave = note.octave;
        newNote.attrs.triad = note.triad;
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
            setActiveElement({
              idx: idx,
              id: note.attrs.pk,
              noteName: note.attrs.noteName,
              octave: note.attrs.octave,
              triad: note.attrs.triad,
            });
          });
        }
      });
    }
  };

  useEffect(() => {
    //   if (activeElement.idx > -1 && toChange && slide) updateNote();
    drawStaff();
    if (notes.length) addNoteListeners();
  }, [notes]);

  // useEffect(() => {
  //   if (activeElement.noteName) {
  //     setNote(activeElement.noteName);
  //     setOctave(activeElement.octave);
  //   }
  // }, [activeElement]);

  useEffect(() => {
    notes.forEach((note, idx) => {
      const noteSVG = document.getElementById(`vf-note${idx + 1}`);
      if (note.attrs.pk === activeElement.id) {
        noteSVG.setAttribute("fill", "orange");
        noteSVG.setAttribute("stroke", "orange");
      }
    });
  }, [activeElement, notes]);

  // const restHandler = () => {
  //   if (duration === "qr") setDuration("q");
  //   else {
  //     setNote("b");
  //     setOctave("4");
  //     setDuration(`qr`);
  //   }
  // };

  return (
    <div>
      <div id="staffDiv"></div>
    </div>
  );
};

export default ViewMusicalStaff;
