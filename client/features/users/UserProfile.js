import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";
import { Link } from "react-router-dom";
import { Typography, Box, ButtonGroup, Button } from "@mui/material";
import { Person, DesignServices } from "@mui/icons-material";
import { black, grey } from "@mui/material/colors";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);

  const singleUser = useSelector((state) => state.singleUser);
  const { username, email, firstName, lastName, avatarUrl } = singleUser;

  const lessons = singleUser.lessons;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(alignment);
  };

  return (
    <div>
      <ButtonGroup variant="text" size="large">
        <Button
          startIcon={<Person />}
          sx={{
            color: "black",
            textDecoration: "underline",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
          style={{ cursor: "default" }}
        >
          User Profile
        </Button>
        <Link to="/creator-dashboard">
          <Button startIcon={<DesignServices />} sx={{ color: "grey" }}>
            Creator Dashboard
          </Button>
        </Link>
      </ButtonGroup>
      <Box m={2}>
        <Typography variant="h3">
          Welcome, {firstName} {lastName}!
        </Typography>
        <img src={avatarUrl} height="200px" />
        <Typography variant="h6">Username: {username}</Typography>
        <Typography variant="h6">Email: {email}</Typography>
      </Box>
    </div>
  );
};

export default UserProfile;
