import React from "react";
import { Instrument } from "piano-chart";



const TestLesson = () => {
console.log("Test Lesson was called")

  const pianoContainer = document.createElement('div');
  pianoContainer.setAttribute('id', 'container');
  document.body.appendChild(pianoContainer);

  const piano = new Instrument(document.getElementById('container'))

  const cMaj = ["C4", "E4", "G4"]


  console.log("piano : ", piano)


    piano.create()
    cMaj.forEach(note=>piano.keyDown(`${note}`))


  return (
    <>
    <h1>A Piano!</h1>


    </>
  )

}

export default TestLesson
