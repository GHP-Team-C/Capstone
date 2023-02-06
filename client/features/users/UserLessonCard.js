import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteLessonAsync, publishStatusSingleLesson } from "../lessons/singleLessonSlice";


const UserLessonCard = (props) => {

  const dispatch = useDispatch()
const lesson = props.lesson
const navigate = useNavigate()

const togglePublishStatus = (event) => {
  event.preventDefault();
  dispatch(publishStatusSingleLesson(lesson.id))
}

const publishStatusButton = (lesson) => {
  return lesson.published ? "Unpublish" : "Publish";
};

const handleDelete = (event) => {
  event.preventDefault();
  dispatch(deleteLessonAsync(lesson.id))
  navigate('/creator-dashboard')
}


//const [publishStatus, setPublishStatus] = useState(false)

return(
  <div>
    <Link to={`/lessons/${lesson.id}/slides/1`}>{lesson.name} </Link>
    <Button onClick={togglePublishStatus}variant="text">{publishStatusButton(lesson)} </Button>
    <Button onClick={handleDelete} variant="text">Delete</Button>
  </div>
)
}

export default UserLessonCard

