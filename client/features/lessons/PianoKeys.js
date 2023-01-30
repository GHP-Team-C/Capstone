import React, { useEffect } from "react";
import { Instrument } from "piano-chart";

const PianoKeys = (props) => {
  /*const pianoContainer = document.createElement("div");
  pianoContainer.setAttribute("id", "container");
  document.body.appendChild(pianoContainer);*/

  let pianoDiv = document.getElementById("pianoDiv");

  useEffect(() => {
    pianoDiv = document.getElementById("pianoDiv");
  }, [props]);

  useEffect(() => {
    if (pianoDiv) {
      const piano = new Instrument(document.getElementById("pianoDiv"));

      const notes = props.pianoNotes;

      console.log("notes: ", notes);

      console.log("piano : ", piano);

      piano.create();
      notes.forEach((note) => piano.keyDown(`${note}`));
    }
  }, [pianoDiv, props]);

  return (
    <>
      <h1>A Piano!</h1>
      <div id="pianoDiv"></div>
    </>
  );
};

export default PianoKeys;
