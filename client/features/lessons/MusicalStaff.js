import React, { useEffect, useState } from "react";
import * as Vex from "vexflow";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffNotes, updateStaffNote } from "./lessonSlice";
import { useNavigate } from "react-router-dom";

const MusicalStaff = ({ note, octave }) => {
  const { Renderer, Stave, Formatter, StaveNote, Voice } = Vex.Flow;

  // Create an SVG renderer and attach it to the DIV element named "boo".
  // const staff = document.createElement("div");
  // staff.setAttribute("id", "staffDiv");
  // document.body.appendChild(staff);

  let div = document.getElementById("staffDiv");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStaffNotes(1));
  }, []);

  const lesson = useSelector((state) => state.lesson);

  // useEffect(() => {
  //   div = document.getElementById("staffDiv");
  // }, [note, octave, lesson]);

  const [activeElement, setActiveElement] = useState({ idx: -1, id: -1 });
  const [toChange, setToChange] = useState(false);
  const notes = [];

  useEffect(() => {
    setToChange(true);
  }, [note, octave]);

  useEffect(() => {
    setToChange(false);
  }, []);

  useEffect(() => {
    const staffCreator = async () => {
      if (activeElement.idx > -1 && toChange) {
        await dispatch(
          updateStaffNote({
            id: 1,
            note: {
              id: activeElement.id,
              noteName: note,
              octave: octave,
              duration: "q",
              domId: activeElement.idx + 1,
            },
          })
        );
        setToChange(false);
        dispatch(fetchStaffNotes(1));
      } else {
        lesson.map((note) => {
          const newNote = new StaveNote({
            keys: [`${note.noteName}/${note.octave}`],
            duration: `${note.duration}`,
          });
          newNote.attrs.id = `note${note.domId}`;
          newNote.attrs.pk = note.id;
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
    staffCreator();
  }, [notes]);

  useEffect(() => {
    if (notes.length) {
      notes.forEach((note, idx) => {
        const noteSVG = document.getElementById(`vf-note${idx + 1}`);
        if (noteSVG) {
          noteSVG.addEventListener("click", () => {
            setActiveElement({ idx: idx, id: note.attrs.pk });
          });
        }
      });
    }
  }, [notes]);

  return (
    <div>
      <div id="staffDiv"></div>
    </div>
  );
};

export default MusicalStaff;
