import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Box,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ShoppingCart, Home, Mail } from "@mui/icons-material";
import { grey, blue } from "@mui/material/colors";
import AllPublicLessons from "../lessons/AllPublicLessons";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <AppBar position="fixed" sx={{ bgcolor: grey[300] }}>
          <Toolbar sx={{ p: -1 }}>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link to="/">
                <IconButton>
                  <Home></Home>
                </IconButton>
              </Link>
              <div>
                <Button onClick={() => setOpen(true)}>Lessons</Button>
                <Drawer
                  open={open}
                  anchor={"left"}
                  onClose={() => setOpen(false)}
                >
                  <div style={{ width: 250 }} onClick={() => setOpen(false)}>
                    <Button>Beginner Lesson</Button>
                    <Button>Intermediate Lesson</Button>
                  </div>

                </Drawer>
              </div>
            </Box>
            <div>
              {isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}
                  <Button
                    onClick={logoutAndRedirectHome}
                    color="secondary"
                    variant="text"
                    sx={{ m: 1 }}
                  >
                    Log Out
                  </Button>
                  <Link to="/user-profile">
                    <IconButton>
                      <Avatar sx={{ bgcolor: blue[300] }}>
                        {/* {user.firstName.charAt(0)} */}
                      </Avatar>
                    </IconButton>
                  </Link>
                </div>
              ) : (
                <div>
                  <Button
                    href="/login"
                    variant="text"
                    sx={{ m: 1, color: "black" }}
                  >
                    Log In
                  </Button>
                  <Button
                    href="/signup"
                    variant="text"
                    sx={{ m: 1, color: "black" }}
                  >
                    Sign Up
                  </Button>
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
