import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllLessons } from "./lessonsSlice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const AllPublicLessons = () => {
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.lessons);
  const navigate = useNavigate();

  const publicLessons =
    lessons && lessons.length
      ? lessons.filter((lesson) => lesson.visibleTo === "Public")
      : null;

  const [level, setLevel] = useState("all");
  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };
  const levelsArray = ["all", "beginner", "intermediate", "advanced"];

  const lessonsFilter = (level) => {
    let filteredLessons =
      publicLessons && publicLessons.length
        ? publicLessons.filter((lesson) => lesson.level === level)
        : null;
    return level === "all" ? publicLessons : filteredLessons;
  };

  const handleView = (id) => {
    navigate(`/lessons/${id}/slides/1`);
  };

  const lessonsLister = (lessonsList) => {
    return lessonsList && lessonsList.length
      ? lessonsList.map((lesson) => (
          <div key={lesson.id}>
            <Box sx={{ width: 550 }} m={2}>
              <Card
                variant="outlined"
                style={{ cursor: "pointer" }}
                onClick={() => handleView(lesson.id)}
              >
                <CardContent>
                  <Typography variant="h6">{lesson.name}</Typography>
                  <Typography variant="subtitle1">
                    {lesson.level.charAt(0).toUpperCase() +
                      lesson.level.slice(1)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </div>
        ))
      : "No Lessons";
  };

  useEffect(() => {
    dispatch(fetchAllLessons());
  }, [dispatch]);

  return (
    <div>
      <h1>Lessons by Level:</h1>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-level">Level</InputLabel>
        <Select
          labelId="select-level"
          id="select-level"
          value={level}
          label="level"
          onChange={handleLevelChange}
        >
          {levelsArray.map((level) => (
            <MenuItem key={level} value={level}>
              {level[0].toUpperCase() + level.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h2>{level[0].toUpperCase() + level.slice(1)}</h2>
      {lessonsLister(lessonsFilter(level))}
    </div>
  );
};

export default AllPublicLessons;
