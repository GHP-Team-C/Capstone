import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleLesson = createAsyncThunk(
  "singleLesson/get",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/lessons/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const publishStatusSingleLesson = createAsyncThunk(
  "lessons/publishing",
  async (id) => {
    try {
      const { data } = await axios.put(`/api/lessons/${id}/publish`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchSingleSlide = createAsyncThunk("slide/get", async (id) => {
  try {
    const { data } = await axios.get(`/api/slides/${id}`);
    return data;
  } catch (err) {
    return err.message;
  }
});

export const makeSlide = createAsyncThunk("slides/put", async (id) => {
  try {
    await axios.put(`/api/lessons/${id}`);
    return true;
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

export const fetchPiano = createAsyncThunk("pianos/get", async (id) => {
  try {
    const { data } = await axios.get(`/api/pianos/${id}`);
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

export const deleteLessonAsync = createAsyncThunk(
  "deleteLesson",
  async (id) => {
    try {
      const { data } = await axios.delete(`api/lessons/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePiano = createAsyncThunk(
  "pianos/put",
  async ({ id, notes }) => {
    try {
      const { data } = await axios.put(`/api/pianos/${id}`, notes);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateLessonTitle = createAsyncThunk(
  "singleLesson/title/put",
  async ({ id, title }) => {
    try {
      const { data } = await axios.put(`/api/lessons/${id}/name`, title);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateSlideText = createAsyncThunk(
  "slides/put",
  async ({ id, text }) => {
    try {
      await axios.put(`/api/slides/${id}`, text);
      return;
    } catch (err) {
      return err.message;
    }
  }
);

export const createLesson = createAsyncThunk(
  "lessons/post",
  async ({ name, level, visibleTo, userId }) => {
    try {
      const { data } = await axios.post("/api/lessons", {
        name,
        level,
        visibleTo,
        userId,
      });
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
      .addCase(fetchSingleSlide.fulfilled, (state, action) => {
        state.slide = action.payload;
      })
      .addCase(fetchPiano.fulfilled, (state, action) => {
        state.piano = action.payload;
      })
      .addCase(updatePiano.fulfilled, (state, action) => {
        state.piano = action.payload;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.lesson = action.payload;
      })
      .addCase(publishStatusSingleLesson.fulfilled, (state, action) => {
        state.lesson = action.payload;
      })
      .addCase(updateLessonTitle.fulfilled, (state, action) => {
        state.lesson = action.payload;
      });
  },
});

export default singleLessonSlice.reducer;
