import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("users/get", async(id) => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    }
  catch (err) {
    return err.message
  }
})

const singleUserSlice = createSlice({
  name: 'singleUser',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
})

export default singleUserSlice.reducer
