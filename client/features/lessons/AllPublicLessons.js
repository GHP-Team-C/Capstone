import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllLessons } from "./lessonsSlice";

const AllPublicLessons = () => {
const dispatch = useDispatch();
const lessons = useSelector((state)=>state.lessons)

const publicLessons = lessons.filter((lesson)=>lesson.visibleTo==="Public")
const beginnerLessons = publicLessons && publicLessons.length ? publicLessons.filter((lesson)=>lesson.level==='beginner') : null
const intermediateLessons = publicLessons && publicLessons.length ? publicLessons.filter((lesson)=>lesson.level==='intermediate') : null
const advancedLessons = publicLessons && publicLessons.length ? publicLessons.filter((lesson)=>lesson.level==='advanced') : null

const lessonLister = (lessonsList) => {
  return (
    lessonsList && lessonsList.length ? lessonsList.map((lesson)=>
<div key={lesson.id}>
  <Link to={`/lessons/${lesson.id}/slides/1`}>{lesson.name}</Link>
</div>) : 'No Lessons'
  )
}

useEffect(()=>{
dispatch(fetchAllLessons())
},[dispatch])

return (
<div>
<h1>Lessons by Level:</h1>
<h2>Beginner</h2>
{lessonLister(beginnerLessons)}

<h2>Intermediate</h2>
{lessonLister(intermediateLessons)}

<h2>Advanced</h2>
{lessonLister(advancedLessons)}
</div>
)

}

export default AllPublicLessons
