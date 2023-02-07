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
} from "@mui/material";
import {
  deleteLessonAsync,
  publishStatusSingleLesson,
} from "../lessons/singleLessonSlice";

const UserLessonCard = (props) => {
  const dispatch = useDispatch();
  const lesson = props.lesson;
  const navigate = useNavigate();

  const togglePublishStatus = (event) => {
    event.preventDefault();
    dispatch(publishStatusSingleLesson(lesson.id));
  };

  const publishStatusButton = (lesson) => {
    return lesson.published ? "Unpublish" : "Publish";
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteLessonAsync(lesson.id));
    setOpen(false);
    navigate("/creator-dashboard");
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //const [publishStatus, setPublishStatus] = useState(false)

  return (
    <div>
      <h3>{lesson.name}</h3> <Link to={`/edit/lessons/${lesson.id}/slides/1`}><Button>Edit</Button></Link><Link to={`/lessons/${lesson.id}/slides/1`}><Button>View</Button></Link>
      <Button onClick={togglePublishStatus} variant="text">
        {publishStatusButton(lesson)}{" "}
      </Button>
      <Button onClick={handleOpen} variant="text">
        Delete
      </Button>
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
