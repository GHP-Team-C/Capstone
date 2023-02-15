import React, { useEffect, useState } from "react";
import { Instrument } from "piano-chart";

let windowListener = undefined;

const PlayerPiano = ({ sampler, open, setAnchorEl }) => {
  let playerPianoDiv = document.getElementById("playerPianoDiv");

  useEffect(() => {
    pianoCreator();
    return () => {
      windowListener.abort();
    };
  });

  const pianoCreator = () => {
    const playerPopper = document.getElementById("player-popper");
    playerPopper.addEventListener("mouseleave", () => setAnchorEl(null));
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
      if (keysHeld.Control && keyToNote[key] && sampler.loaded) {
        pedalKey[key] = true;
        sampler.triggerAttack(keyToNote[key]);
      }
      if (key === "Control") keysHeld.Control = true;
      if (!keysHeld[key] && keyToNote[key] && sampler.loaded) {
        keysHeld[key] = true;
        sampler.triggerAttack(keyToNote[key]);
        if (Array.isArray(keyToNote[key])) {
          keyToNote[key].forEach((key) => {
            piano.keyDown(key);
          });
        } else piano.keyDown(keyToNote[key]);
      }
    }

    function upHandler({ key }) {
      if (key === "Control") {
        keysHeld.Control = false;
        Object.keys(keysHeld).forEach((noteKey) => {
          if (pedalKey[noteKey]) {
            pedalKey[noteKey] = false;
            sampler.triggerRelease(keyToNote[noteKey]);
            if (Array.isArray(keyToNote[noteKey])) {
              keyToNote[noteKey].forEach((arrayKey) => {
                piano.keyUp(arrayKey);
              });
            } else piano.keyUp(keyToNote[noteKey]);
          }
        });
      }
      if (keyToNote[key] && !keysHeld.Control) {
        keysHeld[key] = false;
        sampler.triggerRelease(keyToNote[key]);
        if (Array.isArray(keyToNote[key])) {
          keyToNote[key].forEach((key) => {
            piano.keyUp(key);
          });
        } else piano.keyUp(keyToNote[key]);
      } else if (keyToNote[key] && keysHeld.Control) {
        Object.keys(keysHeld).forEach((noteKey) => {
          if (keysHeld[noteKey] && noteKey !== "Control") {
            keysHeld[noteKey] = false;
            if (Array.isArray(keyToNote[noteKey])) {
              keyToNote[noteKey].forEach((arrayKey) => {
                piano.keyUp(arrayKey);
              });
            } else piano.keyUp(keyToNote[noteKey]);
          }
        });
      }
    }

    const handleListeners = () => {
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
    s: "c4",
    e: "c#4",
    d: "d4",
    r: "d#4",
    f: "e4",
    g: "f4",
    y: "f#4",
    h: "g4",
    u: "g#4",
    j: "a4",
    i: "a#4",
    k: "b4",
    l: "c5",
    S: "c5",
    E: "c#5",
    D: "d5",
    R: "d#5",
    F: "e5",
    G: "f5",
    Y: "f#5",
    H: "g5",
    U: "g#5",
    J: "a5",
    I: "a#5",
    K: "b5",
    L: "c6",
    z: ["c4", "e4", "g4"],
    x: ["d4", "f4", "a4"],
    c: ["e4", "g4", "b4"],
    v: ["f4", "a4", "c5"],
    b: ["g4", "b4", "d5"],
    n: ["a4", "c5", "e5"],
    m: ["b4", "d5", "f5"],
    Z: ["c5", "e5", "g5"],
    X: ["d5", "f5", "a5"],
    C: ["e5", "g5", "b5"],
    V: ["f5", "a5", "c6"],
    B: ["g5", "b5", "d6"],
    N: ["a5", "c6", "e6"],
    M: ["b5", "d6", "f6"],
  };

  const keysHeld = {};

  const pedalKey = {};

  return (
    <div>
      <div id="playerPianoDiv" style={pianoStyle}></div>
    </div>
  );
};

export default PlayerPiano;
