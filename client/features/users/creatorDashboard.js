
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLessons, selectUserLessons } from "../lessons/lessonsSlice";
import { fetchSingleUser, selectSingleUser } from "./singleUserSlice"
// import fetchLessonsAsync

const CreatorDashboard = () => {
const dispatch = useDispatch()
const userId = useSelector((state)=>state.auth.me.id)

const singleUser = useSelector((state)=>state.singleUser);

const lessons = singleUser.lessons

useEffect(()=>{
  dispatch(fetchSingleUser(userId))
},[dispatch])

  return (
    <div>
      <h1>Creator Dashboard</h1>
      {lessons && lessons.length ? lessons.map((lesson, idx)=> <p>{lesson.name}</p>) : null}


    </div>
  );
};

export default CreatorDashboard;
