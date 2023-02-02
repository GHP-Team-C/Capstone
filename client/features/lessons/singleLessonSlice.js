import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleLesson = createAsyncThunk("lessons/get", async (id) => {
  try {
    const { data } = await axios.get(`/api/lessons/${id}`);
    return data;
  } catch (err) {
    return err.message;
  }
});


export const fetchSingleSlide = createAsyncThunk("slide/get", async (id) => {
  try {
    const { data } = await axios.get(`/api/slides/${id}`);
    return data;
  } catch (err) {
    return err.message;
  }
});

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
  async ({ id, note }) => {
    try {
      const { data } = await axios.put(`/api/staves/${id}`, note);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

const singleLessonSlice = createSlice({
  name: "lesson",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(fetchSingleLesson.fulfilled, (state, action) => {
        state.lesson = action.payload;
      })
      .addCase(fetchSingleSlide.fulfilled, (state, action)=>{
        state.slide = action.payload;
      })
  },
});

export default singleLessonSlice.reducer;
