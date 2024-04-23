import React from "react";
import "../style/Login.css";
import locker from "../assets/locker.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur HTTP, statut " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("accessToken", data.accessToken);
        });
      navigate("/main");
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <div className="logo">
          <img src={locker} alt="" />
        </div>
        <div className="text-center mt-4 name">Password Safetybox</div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn mt-3" onClick={handleSubmit}>
            Login
          </button>
          <br />
          <button className="btn" onClick={() => navigate("/createUser")}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
