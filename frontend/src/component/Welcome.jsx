import React, { useEffect, useState } from "react";
import axios from "axios";
// By setting axios.defaults.withCredentials to true, you are telling Axios to include credentials (like cookies and authentication headers) when making cross-origin requests.
axios.defaults.withCredentials = true;
let firstRender = true;
const refresh = async () => {
  try {
    const res = await axios.get("http://localhost:3000/refresh", {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const sendRequest = async () => {
  try {
    const res = await axios.get("http://localhost:3000/user", {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const Welcome = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    let interval;
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
    interval = setInterval(() => {
      refresh().then((data) => setUser(data.user));
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);
  // console.log(user);
  return (
    <div>
      <h1>Welcome</h1>
      <h2>Name: {user.name}</h2>
      <h2>Email: {user.email}</h2>
    </div>
  );
};

export default Welcome;
