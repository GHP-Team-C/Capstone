import React, { useState } from "react";

import PianoKeys from "./PianoKeys";
import MusicalStaff from "./MusicalStaff";
import StaffForm from "./StaffForm";

const LessonTemplate = () => {
  const [pianoNotes, setPianoNotes] = useState(["c4", "e4", "g4", "b4"]);

  const handleClick = () => {
    const pianoSvg = document.getElementById("piano");
    const pianoDiv = document.getElementById("pianoDiv");
    if (pianoSvg) pianoDiv.removeChild(pianoSvg);
    setPianoNotes(["d4", "f4", "a4"]);
  };

  return (
    <>
      <h1> Lessons Template </h1>
      <StaffForm />
      <button onClick={handleClick}>Press me!</button>
      <PianoKeys pianoNotes={pianoNotes} />
    </>
  );
};

export default LessonTemplate;
