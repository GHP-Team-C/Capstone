import React from "react"
import UserLessonCard from "./UserLessonCard";


const UserLessonsList = (props) => {

const lessons = props.lessons

console.log("lessons: ", lessons)

/* const publishedLessons =
    lessons && lessons.length
      ? lessons.filter((lesson) => lesson.published)
      : null;

  const draftLessons =
    lessons && lessons.length
      ? lessons.filter((lesson) => !lesson.published)
      : null;

  const publishStatusButton = (lesson) => {

    return lesson.published ? "Unpublish" : "Publish";
  }; */

return (
<div>
  <h3>Published</h3>
    <div>
      {lessons.map((lesson)=>
      <div key={lesson.id}>
        <UserLessonCard lesson={lesson}/>
        </div>
      )}
    </div>
  <h3>Drafts</h3>
</div>
)}

export default UserLessonsList
