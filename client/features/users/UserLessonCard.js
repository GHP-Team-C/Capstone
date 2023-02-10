import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  deleteLessonAsync,
  publishStatusSingleLesson,
} from "../lessons/singleLessonSlice";
import { fetchSingleUser } from "./singleUserSlice";

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
    setOpen(false);
    dispatch(fetchSingleUser(props.userId));
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = () => {
    navigate(`/lessons/${lesson.id}/slides/1`);
  };

  const handleEdit = () => {
    navigate(`/edit/lessons/${lesson.id}/slides/1`);
  };

  //const [publishStatus, setPublishStatus] = useState(false)

  return (
    <div>
      <Box sx={{ minWidth: 275 }} m={2}>
        <Card variant="outlined">
          <Stack direction="row">
            <CardContent>
              <Typography
                variant="h5"
                onClick={handleView}
                style={{ cursor: "pointer" }}
              >
                {lesson.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Edit
                fontSize="small"
                onClick={handleEdit}
                style={{ cursor: "pointer" }}
              />
              <Delete onClick={handleOpen} style={{ cursor: "pointer" }} />
            </CardActions>
          </Stack>
          <CardActions>
            <Button onClick={togglePublishStatus} variant="text">
              {publishStatusButton(lesson)}{" "}
            </Button>
          </CardActions>
        </Card>
      </Box>
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your lesson "{lesson.name}" cannot be recovered once deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete}>Yes, Delete</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default UserLessonCard;
