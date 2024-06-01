import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const Navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
    draggable: true,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = value;
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOption);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          Navigate("/chat");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred during login", toastOption);
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = value;
    if (password === "") {
      toast.error("Email and password is required ", toastOption);
      return false;
    } else if (username === "") {
      toast.error("Email and password is required", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onClick={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="Logo" />
            <h1>Aoo bath krlo na </h1>
          </div>
          <input
            type="text"
            placeholder="userName"
            name="username"
            min="5"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login In</button>
          <span>
            Don't have an acount ? <Link to="/">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    img {
      height: 5rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 2rem 5rem;
    border-radius: 20px;
    h1 {
      color: white;
    }
    input {
      background-color: transparent;
      padding: 0.5rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.3rem;
      color: white;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid 997af0;
        outline: none;
      }
    }
    button {
      padding: 0.5rem;
      background-color: #997af0;
      border-radius: 0.3rem;
      font-size: 1rem;
    }
    span {
      color: white;
    }
  }
`;

export default Login;
