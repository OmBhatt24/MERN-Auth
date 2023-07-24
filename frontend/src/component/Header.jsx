import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/index.js";
import axios from "axios";
axios.defaults.withCredentials = true;
const Header = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const logoutRequest = async () => {
    axios
      .get("http://localhost:3000/logout")
      .catch((err) => new Error("can't logout"));
  };
  const handleLogout = () => {
    logoutRequest().then(dispatch(logout()));
  };
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MernAuth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab LinkComponent={Link} to="login" label="Login" />

              <Tab LinkComponent={Link} to="signup" label="Signup" />
              {isLoggedIn && (
                <Tab
                  LinkComponent={Link}
                  onClick={handleLogout}
                  to="logout"
                  label="Logout"
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
