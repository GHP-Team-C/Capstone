import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import lessonReducer from "../features/lessons/lessonSlice";

const store = configureStore({
  reducer: { auth: authReducer, lesson: lessonReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
