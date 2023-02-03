import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllLessons } from "./lessonsSlice";

const AllPublicLessons = () => {
const dispatch = useDispatch();
const lessons = useSelector((state)=>state.lessons)
console.log("lessons in AllPublicLessons: ", lessons)

useEffect(()=>{
dispatch(fetchAllLessons())
},[dispatch])

return (
<div>
{lessons && lessons.length ? lessons.map((lesson)=>
<div key={lesson.id}>
  <Link to={`/lessons/${lesson.id}/slides/1`}>{lesson.name}</Link>
</div>) : null}
</div>
)

}

export default AllPublicLessons
