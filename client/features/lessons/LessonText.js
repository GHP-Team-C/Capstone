import React, {useState} from "react";

const LessonText = () => {
  const [text, setText] = useState("");

  const handleChange =(e)=>{
    setText(e.target.value)
  }

  return(
    <div>
      <label for="lessonText">Lesson Instructions</label>
      <textarea rows="20" cols="50" id="lessonText" name="lessonText" onChange={handleChange}>{text}</textarea>
    </div>
  )

}

export default LessonText
