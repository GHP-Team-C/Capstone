import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { fetchSingleUser } from "./singleUserSlice";
import { useDispatch } from "react-redux";
import {
  deleteLessonAsync,
  publishStatusSingleLesson,
} from "../lessons/singleLessonSlice";

const UserLessonCard = (props) => {
  const dispatch = useDispatch();
  const lesson = props.lesson;
  const navigate = useNavigate();

  const togglePublishStatus = async (event) => {
    event.preventDefault();
    await dispatch(publishStatusSingleLesson(lesson.id));
    dispatch(fetchSingleUser(props.userId));
  };

  const publishStatusButton = (lesson) => {
    return lesson.published ? "Unpublish" : "Publish";
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await dispatch(deleteLessonAsync(lesson.id));
    dispatch(fetchSingleUser(props.userId));
  };

  console.log("bottom level", props.userId);

  //const [publishStatus, setPublishStatus] = useState(false)

  return (
    <div>
      <Link to={`/lessons/${lesson.id}/slides/1`}>{lesson.name} </Link>
      <Button onClick={togglePublishStatus} variant="text">
        {publishStatusButton(lesson)}{" "}
      </Button>
      <Button onClick={handleDelete} variant="text">
        Delete
      </Button>
    </div>
  );
};

export default UserLessonCard;
