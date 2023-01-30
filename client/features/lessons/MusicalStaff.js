import React, { useEffect, useState } from "react";
import * as Vex from "vexflow";

const MusicalStaff = ({ note, octave }) => {
  const { Renderer, Stave, Formatter, StaveNote, Voice } = Vex.Flow;

  // Create an SVG renderer and attach it to the DIV element named "boo".
  // const staff = document.createElement("div");
  // staff.setAttribute("id", "staffDiv");
  // document.body.appendChild(staff);

  let div = document.getElementById("staffDiv");

  useEffect(() => {
    div = document.getElementById("staffDiv");
  }, [note, octave]);

  const [activeElement, setActiveElement] = useState({});

  useEffect(() => {
    const svg = document.getElementById("staff");
    if (div && !svg) {
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

      const note1 = new StaveNote({
        keys: [`${note}/${octave}`],
        duration: "q",
      });
      note1.attrs.id = "note1";

      const notes = [
        // A quarter-note C.
        note1,
        // new StaveNote({ keys: [`${note}/4`], duration: "q" }),

        // A quarter-note D.
        new StaveNote({ keys: ["d/4"], duration: "q" }),

        // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // position of the rest.
        new StaveNote({ keys: ["b/4"], duration: "qr" }),

        // A C-Major chord.
        new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
      ];

      // Create a voice in 4/4 and add above notes
      const voice = new Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables(notes);

      // Format and justify the notes to 400 pixels.
      new Formatter().joinVoices([voice]).format([voice], 350);

      // Render voice
      voice.draw(context, stave);
    }
  }, [div, note, octave]);

  return (
    <div>
      <div id="staffDiv"></div>
    </div>
  );
};

export default MusicalStaff;
