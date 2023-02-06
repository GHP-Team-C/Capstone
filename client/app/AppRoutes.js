import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import CreatorDashboard from "../features/users/CreatorDashboard";
import { me } from "./store";
import LessonTemplate from "../features/lessons/LessonTemplate";
import UserProfile from "../features/users/UserProfile";
import NotFoundPage from "../features/notFoundPage/NotFoundPage";
import SignUpAuthForm from "../features/auth/SignUpAuthForm"

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
          <Route
            path="/lessons/:lId/slides/:sId"
            element={<LessonTemplate />}
          />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />

          <Route
            path="/*"
            element={<NotFoundPage />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={<NotFoundPage />}
          />
          <Route
            path="/lessons/:lId/slides/:sId"
            element={<LessonTemplate />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<SignUpAuthForm name="signup" displayName="Sign Up" />}
          />

        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
