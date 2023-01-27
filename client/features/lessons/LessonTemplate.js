import React from "react";

import PianoKeys from "./PianoKeys";
import MusicalStaff from  "./MusicalStaff"


const pianoNotes = ["c4", "e4", "g4", "b4"]

const LessonTemplate = () => {


  return (
    <>
    <h1> Lessons Template </h1>
      <MusicalStaff />

      <PianoKeys pianoNotes={pianoNotes}/>

    </>
  )

}

export default LessonTemplate
