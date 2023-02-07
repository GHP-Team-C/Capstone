import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";
import UserLessonCard from "./UserLessonCard";


const UserLessonsList = (props) => {

const lessons = props.lessons




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
        <UserLessonCard lesson={lesson}/>
        </div>
      )}
    </div>
  <h2>Draft Lessons:</h2>
  <div>
      {draftLessons.map((lesson)=>
      <div key={lesson.id}>
        <UserLessonCard lesson={lesson}/>
        </div>
      )}
    </div>
</div>
)}

export default UserLessonsList
