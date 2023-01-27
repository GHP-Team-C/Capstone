import React from "react";

import PianoKeys from "./PianoKeys";
import MusicalStaff from  "./MusicalStaff"
import StaffForm from "./StaffForm";


const pianoNotes = ["c4", "e4", "g4", "b4"]

const LessonTemplate = () => {


  return (
    <>
    <h1> Lessons Template </h1>
    <StaffForm />
    <div id='staff'>
      </div>
      <PianoKeys pianoNotes={pianoNotes}/>

    </>
  )

}

export default LessonTemplate
