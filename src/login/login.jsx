import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("outside log in try{}");
    try {
      console.log("inside log in try{}");
      console.log(`React app api url:${process.env.REACT_APP_API_URL}`);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/");

      localStorage.setItem("token", res.data.data.token);

      // Optional: store user info too
      localStorage.setItem("user", JSON.stringify(res.data.data));

      dispatch(login(res.data));

      console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="login-section">
        <div className="login-header">
          <h2>Signin</h2>
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <button type="submit">Login</button>
            {/* <p>
              New user <Link to={"/register"}>Register Here</Link>
            </p> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
