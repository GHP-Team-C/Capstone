import React from "react";
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
} from "@mui/material";
import { ShoppingCart, Home } from "@mui/icons-material";
import { grey, blue } from "@mui/material/colors";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div>
        <AppBar position="fixed" sx={{ bgcolor: grey[300] }}>
          <Toolbar sx={{ p: -1 }}>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <IconButton href="/">
                <Home></Home>
              </IconButton>
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
                  <IconButton href="/user">
                    <Avatar sx={{ bgcolor: blue[300] }}>
                      {/* {user.firstName.charAt(0)} */}
                    </Avatar>
                  </IconButton>
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
