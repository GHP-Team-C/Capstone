import React, { useEffect } from "react";
import { Instrument } from "piano-chart";

const PianoKeys = ({ pianoNotes }) => {
  /*const pianoContainer = document.createElement("div");
  pianoContainer.setAttribute("id", "container");
  document.body.appendChild(pianoContainer);*/

  let pianoDiv = document.getElementById("pianoDiv");

  useEffect(() => {
    pianoDiv = document.getElementById("pianoDiv");
  }, [pianoNotes]);

  useEffect(() => {
    if (pianoDiv) {
      const piano = new Instrument(document.getElementById("pianoDiv"));

      console.log("notes: ", pianoNotes);

      console.log("piano : ", piano.container.children);

      piano.create();
      piano.container.children[0].setAttribute("id", "piano");
      pianoNotes.forEach((note) => piano.keyDown(`${note}`));
    }
  }, [pianoDiv, pianoNotes]);

  return (
    <>
      <h1>A Piano!</h1>
      <div id="pianoDiv"></div>
    </>
  );
};

export default PianoKeys;
