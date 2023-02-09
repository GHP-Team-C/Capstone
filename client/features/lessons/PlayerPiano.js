import React, { useEffect, useState } from "react";
import { Instrument } from "piano-chart";

let windowListener = undefined;

const PlayerPiano = ({ sampler, open }) => {
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
    piano.applySettings({ vividKeyPressColor: "#ffa500" });
    piano.applySettings({ keyPressStyle: "vivid" });
    piano.addKeyMouseDownListener(async (note) => {
      let fullNote = "";
      if (note.accidental)
        fullNote = `${note.note}${note.accidental}${note.octave}`;
      else fullNote = `${note.note}${note.octave}`;
      if (sampler.loaded) {
        sampler.triggerAttack(fullNote);
        piano.keyDown(note);
      }
    });
    piano.addKeyMouseUpListener(async (note) => {
      let fullNote = "";
      if (note.accidental)
        fullNote = `${note.note}${note.accidental}${note.octave}`;
      else fullNote = `${note.note}${note.octave}`;
      if (sampler.loaded) {
        sampler.triggerRelease(fullNote);
        piano.keyUp(note);
      }
    });

    function downHandler({ key }) {
      if (!keysHeld[key] && keyToNote[key] && sampler.loaded) {
        keysHeld[key] = true;
        sampler.triggerAttack(keyToNote[key]);
        piano.keyDown(keyToNote[key]);
      }
    }

    function upHandler({ key }) {
      if (keyToNote[key] && sampler.loaded) {
        keysHeld[key] = false;
        sampler.triggerRelease(keyToNote[key]);
        piano.keyUp(keyToNote[key]);
      }
    }

    const handleListeners = () => {
      //on open
      if (open) {
        windowListener = new AbortController();
        window.addEventListener("keydown", downHandler, {
          signal: windowListener.signal,
        });
        window.addEventListener("keyup", upHandler, {
          signal: windowListener.signal,
        });
      }
    };
    if (open) handleListeners();
  };

  const pianoStyle = {
    width: "800px",
  };

  const keyToNote = {
    a: "c4",
    w: "c#4",
    s: "d4",
    e: "d#4",
    d: "e4",
    f: "f4",
    t: "f#4",
    g: "g4",
    y: "g#4",
    h: "a4",
    u: "a#4",
    j: "b4",
    k: "c5",
    o: "c#5",
    l: "d5",
  };

  const keysHeld = {};

  return (
    <div>
      <div id="playerPianoDiv" style={pianoStyle}></div>
    </div>
  );
};

export default PlayerPiano;
