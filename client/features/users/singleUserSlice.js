import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const fetchSingleUser = createAsyncThunk("users/get", async (id) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    console.log("data from fetchSingleUser: ", data)
    return data;
  } catch (err) {
    return err.message;
  }
});

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

/* export const selectSingleUser = () => {
  console.log("state from single User Slice: ", state)
  return state.singleUser;
} */

export default singleUserSlice.reducer;
