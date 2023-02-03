import React from "react"
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const UserLessonCard = (props) => {

const lesson = props.lesson

const publishStatusButton = (lesson) => {
  return lesson.published ? "Unpublish" : "Publish";
};
//const [publishStatus, setPublishStatus] = useState(false)

return(
  <div>
    <Link to={`/lessons/${lesson.id}/slides/1`}>{lesson.name}</Link>
    <Button variant="text">{publishStatusButton(lesson)}</Button>
  </div>
)
}

export default UserLessonCard

