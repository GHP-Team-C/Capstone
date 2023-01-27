import React from "react";
import { Instrument } from "piano-chart";



const PianoKeys = (props) => {

  const pianoContainer = document.createElement('div');
  pianoContainer.setAttribute('id', 'container');
  document.body.appendChild(pianoContainer);

  const piano = new Instrument(document.getElementById('container'))

  const notes = props.pianoNotes

  console.log("notes: ", notes)


  console.log("piano : ", piano)


    piano.create()
    notes.forEach(note=>piano.keyDown(`${note}`))


  return (
    <>
    <h1>A Piano!</h1>


    </>
  )

}

export default PianoKeys
