import React, { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import MusicalStaff from "./MusicalStaff";

export default function StaffForm({ slide }) {
  return (
    <div>
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
      <MusicalStaff slide={slide} />
    </div>
  );
}
