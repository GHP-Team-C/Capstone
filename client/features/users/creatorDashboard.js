import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";

const CreatorDashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);

  const singleUser = useSelector((state) => state.singleUser);

  const lessons = singleUser.lessons;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  const publishedLessons =
    lessons && lessons.length
      ? lessons.filter((lesson) => lesson.published)
      : null;
  const draftLessons =
    lessons && lessons.length
      ? lessons.filter((lesson) => !lesson.published)
      : null;

  return (
    <div>
      <h1>Creator Dashboard</h1>
      <h3>Published</h3>
      {publishedLessons && publishedLessons.length
        ? publishedLessons.map((lesson) => <p key={lesson.id}>{lesson.name}</p>)
        : "No published lessons"}
      <h3>Drafts</h3>
      {draftLessons && draftLessons.length
        ? draftLessons.map((lesson) => <p key={lesson.id}>{lesson.name}</p>)
        : "No published lessons"}
    </div>
  );
};

export default CreatorDashboard;
