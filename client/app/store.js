import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import singleLessonReducer from "../features/lessons/singleLessonSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";
import singleUserReducer from "../features/users/singleUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleLesson: singleLessonReducer,
    lessons: lessonsReducer,
    singleUser: singleUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
