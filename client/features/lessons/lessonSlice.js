import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStaffNotes = createAsyncThunk("staff/get", async (id) => {
  try {
    const { data } = await axios.get(`/api/staff/${id}`);
    return data;
  } catch (err) {
    return err.message;
  }
});

const lessonSlice = createSlice({
  name: "lesson",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStaffNotes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default lessonSlice.reducer;
