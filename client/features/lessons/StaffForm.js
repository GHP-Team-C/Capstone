import React, { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select}from '@mui/material';
import MusicalStaff from "./MusicalStaff";


export default function StaffForm(){
  const [note, setNote] = useState('c');
  

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  const noteArray = ["c", "d", "e", "f", "g", "a", "b"]

  return(
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Note</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={note}
        label="note"
        onChange={handleChange}
      >
     {noteArray.map((note)=> <MenuItem key={note} value={note}>{note}</MenuItem>)}
      </Select>
    </FormControl>
    <MusicalStaff note={note}/>
       </div>
  )
}
