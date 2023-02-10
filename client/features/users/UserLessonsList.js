import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";
import UserLessonCard from "./UserLessonCard";
import { Typography, Stack, Divider } from "@mui/material";

const UserLessonsList = (props) => {
  const lessons = props.lessons;
  const userId = props.userId;

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
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <div>
          <Typography variant="h5" m={2}>
            Published Lessons
          </Typography>
          <div>
            {publishedLessons.map((lesson) => (
              <div key={lesson.id}>
                <UserLessonCard lesson={lesson} userId={userId} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Typography variant="h5" m={2}>
            Draft Lessons
          </Typography>
          <div>
            {draftLessons.map((lesson) => (
              <div key={lesson.id}>
                <UserLessonCard lesson={lesson} userId={userId} />
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default UserLessonsList;
