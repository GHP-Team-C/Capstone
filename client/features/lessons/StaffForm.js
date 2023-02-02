import React, { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import MusicalStaff from "./MusicalStaff";

export default function StaffForm({slide}) {
  const [note, setNote] = useState("c");
  const [octave, setOctave] = useState("4");
  const [duration, setDuration] = useState("q");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleOctaveChange = (event) => {
    setOctave(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const noteArray = ["c", "d", "e", "f", "g", "a", "b"];
  const octaveArray = ["1", "2", "3", "4", "5", "6", "7"];
  const durationArray = ["w", "h", "q", "8", "16"];

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-note">Note</InputLabel>
        <Select
          labelId="select-note"
          id="select-note"
          value={note}
          label="note"
          onChange={handleNoteChange}
        >
          {noteArray.map((note) => (
            <MenuItem key={note} value={note}>
              {note}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-octave">Octave</InputLabel>
        <Select
          labelId="select-octave"
          id="select-octave"
          value={octave}
          label="octave"
          onChange={handleOctaveChange}
        >
          {octaveArray.map((octave) => (
            <MenuItem key={octave} value={octave}>
              {octave}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-duration">Duration</InputLabel>
        <Select
          labelId="select-duration"
          id="select-duration"
          value={duration}
          label="duration"
          onChange={handleDurationChange}
        >
          {durationArray.map((duration) => (
            <MenuItem key={duration} value={duration}>
              {duration}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <MusicalStaff slide={slide} note={note} octave={octave} duration={duration} />
    </div>
  );
}
