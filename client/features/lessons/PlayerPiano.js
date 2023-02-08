import React, { useEffect } from "react";
import { Instrument } from "piano-chart";

const PlayerPiano = ({ sampler }) => {
  let playerPianoDiv = document.getElementById("playerPianoDiv");

  useEffect(() => {
    pianoCreator();
  }, []);

  const pianoCreator = () => {
    const piano = new Instrument(document.getElementById("playerPianoDiv"), {
      startOctave: 2,
      endOctave: 7,
    });

    piano.create();
    piano.addKeyMouseDownListener(async (note) => {
      let fullNote = "";
      if (note.accidental)
        fullNote = `${note.note}${note.accidental}${note.octave}`;
      else fullNote = `${note.note}${note.octave}`;
      sampler.triggerAttack(fullNote);
      piano.keyDown(note);
    });
    piano.addKeyMouseUpListener(async (note) => {
      let fullNote = "";
      if (note.accidental)
        fullNote = `${note.note}${note.accidental}${note.octave}`;
      else fullNote = `${note.note}${note.octave}`;
      sampler.triggerRelease(fullNote);
      piano.keyUp(note);
    });
  };

  const pianoStyle = {
    width: "800px",
  };

  return (
    <div>
      <div id="playerPianoDiv" style={pianoStyle}></div>
    </div>
  );
};

export default PlayerPiano;
