import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";
import UserLessonCard from "./UserLessonCard";

const UserLessonsList = (props) => {
  const lessons = props.lessons;
  const userId = props.userId;

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
  <h2>Published Lessons:
  </h2>
    <div>
      {publishedLessons.map((lesson)=>
      <div key={lesson.id}>
        <UserLessonCard lesson={lesson} userId={userId}/>
        </div>
      )}
    </div>
  <h2>Draft Lessons:</h2>
  <div>
      {draftLessons.map((lesson)=>
      <div key={lesson.id}>
        <UserLessonCard lesson={lesson} userId={userId}/>
        </div>
      )}
    </div>
  );
};

export default UserLessonsList;
