import React, { useState } from "react";
import './register.css'
import { Link, useNavigate  } from "react-router-dom";
import axios  from 'axios';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../redux/authSlice";


const Register = () => {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    console.log("Sign up page")
    console.log("Sign up user=====", user);
    try {
      console.log("Sign up inside try page");
      console.log("React App new", process.env.REACT_APP_API_URL);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/signup`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(authLogin(user));
        navigate("/login");
        toast.success(res?.data?.message);
      }

      console.log(res);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Registration error:", error);
    }

    setUser({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      
    });

 
  
  }
  

  return (
    <>
      <div className="register-section">
        <div className="form-header">
          <h2>Register</h2>
          <form onSubmit={handleRegisterForm}>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              placeholder="Password"
            />
            <button type="submit">Register</button>
            <p>
              Already registered <Link to="/login">login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
  }
      
  export default Register;