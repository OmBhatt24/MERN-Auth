import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [inputs, setinputs] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = inputs;
  const history = useNavigate();
  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        name,
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
      history("/login");
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
          <Typography variant="h2"> Signup</Typography>
          <TextField
            name="name"
            variant="outlined"
            placeholder="Name"
            margin="normal"
            value={name}
            onChange={handleChange}
          />
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
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
