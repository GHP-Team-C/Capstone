import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import CreatorDashboard from "../features/users/CreatorDashboard";
import { me } from "./store";
import LessonTemplate from "../features/lessons/LessonTemplate";
import UserProfile from "../features/users/UserProfile";

import AllPublicLessons from "../features/lessons/AllPublicLessons";

import NotFoundPage from "../features/notFoundPage/NotFoundPage";
import CreateLesson from "../features/lessons/CreateLesson";
import SignUpAuthForm from "../features/auth/SignUpAuthForm";
import ViewLesson from "../features/lessons/ViewLesson";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons/:lId/slides/:sId" element={<ViewLesson />} />
          <Route
            path="/edit/lessons/:lId/slides/:sId"
            element={<LessonTemplate />}
          />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />

          <Route path="/all-public-lessons" element={<AllPublicLessons />} />

          <Route path="/create-lesson" element={<CreateLesson />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons/:lId/slides/:sId" element={<ViewLesson />} />
          <Route path="/all-public-lessons" element={<AllPublicLessons />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<SignUpAuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
