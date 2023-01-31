import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStaffNotes = createAsyncThunk("staves/get", async (id) => {
  try {
    const { data } = await axios.get(`/api/staves/${id}`);
    return data;
  } catch (err) {
    return err.message;
  }
});

export const postStaffNotes = createAsyncThunk(
  "staves/post",
  async (staff, notes) => {
    try {
      const { data } = await axios.post("/api/staves", { staff, notes });
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateStaffNote = createAsyncThunk(
  "staves/put",
  async ({id, note}) => {
    try {
      const { data } = await axios.put(`/api/staves/${id}`, note );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

const lessonSlice = createSlice({
  name: "lesson",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStaffNotes.fulfilled, (state, action) => {
      return action.payload;
    })
  },
});

export default lessonSlice.reducer;
