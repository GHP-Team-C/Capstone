import React from "react"
import { Link, Button } from "@mui/material"


const UserLessonCard = (props) => {

const lesson = props.lesson

const publishStatusButton = (lesson) => {
  return lesson.published ? "Unpublish" : "Publish";
};
//const [publishStatus, setPublishStatus] = useState(false)

return(
  <div>
        <p>
          <Link to={`/lessons/${lesson.id}`}>{lesson.name}</Link>
        </p>
        <Button variant="text">{publishStatusButton(lesson)}</Button>
      </div>
)
}

export default UserLessonCard

