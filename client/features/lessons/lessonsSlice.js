import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllLessons = createAsyncThunk("lessons/get", async () => {
  try {
    const { data } = await axios.get("/api/lessons");
    return data;
  } catch (err) {
    return err.message;
  }
});

export const fetchUserLessons = createAsyncThunk(
  "userLessons/get",
  async (id) => {
    try {
      const { data } = await axios.get("/api/lessons/${id}");
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

// export const createLesson = createAsyncThunk(
//   "lessons/post",
//   async ({ name, level, visibleTo, userId }) => {
//     const { data } = await axios.post("/api/lessons", {
//       name,
//       level,
//       visibleTo,
//       userId,
//     });
//     return data;
//   }
// );

const lessonsSlice = createSlice({
  name: "lessons",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllLessons.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchUserLessons.fulfilled, (state, action) => {
      return action.payload;
    });
    // builder.addCase(createLesson.fulfilled, (state, action) => {
    //   state.push(action.payload);
    // });
  },
});

export default lessonsSlice.reducer;
