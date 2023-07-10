import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const history = useNavigate();
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      let data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      history("/user");
    });
  };
  const handleChange = (e) => {
    setinputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"300px"}
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h2"> Login </Typography>

          <TextField
            name="email"
            variant="outlined"
            placeholder="Email"
            margin="normal"
            value={email}
            type="email"
            onChange={handleChange}
          />
          <TextField
            name="password"
            value={password}
            variant="outlined"
            placeholder="Password"
            type="password"
            margin="normal"
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
