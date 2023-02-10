import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  MenuItem
, Menu
} from "@mui/material";
import {  Home } from "@mui/icons-material";
import { grey, blue } from "@mui/material/colors";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const navigateToUserProfile = () => {
    navigate("/user-profile");
  };

  const navigateToCreatorDashboard = () => {
    navigate("/creator-dashboard");
  };

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div>
        <AppBar position="fixed" sx={{ bgcolor: grey[300] }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: -1 }}>
            <Box sx={{ display: "flex" }}>
              <Link to="/">
                <IconButton>
                  <Home></Home>
                </IconButton>
              </Link>
              <div>
                <Link  to="/all-public-lessons">

                <Button>Browse Lessons</Button>

                </Link>
              </div>
            </Box>
            <div><img src="/logo.png" id="navlogo"/></div>

            <div>
              {isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}

                    <IconButton onClick={handleClick}>
                      <Avatar aria-controls="basix-menu" aria-haspopup="true"
          aria-expanded={openMenu ? 'true': undefined}
           sx={{ bgcolor: blue[300] }}>
                        {/* {user.firstName.charAt(0)} */}
                      </Avatar>
                    </IconButton>
                    <Menu
              id="basic-menu"
              open={openMenu}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => {
                  navigateToUserProfile();
                  handleClose();
                }}>User Profile</MenuItem>
              <MenuItem onClick={() => {
                  navigateToCreatorDashboard();
                  handleClose();
                }}>Creator Dashboard</MenuItem>
              <MenuItem onClick={() => {
                  logoutAndRedirectHome();
                  handleClose();
                }}>Log Out</MenuItem>

            </Menu>

                </div>
              ) : (
                <div>
                  <Link to="/login">
                    <Button variant="text" sx={{ m: 1, color: "black" }}>
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="text" sx={{ m: 1, color: "black" }}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    </>
  );
};

export default Navbar;
