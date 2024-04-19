import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserCreationForm() {
  const url = "http://localhost:8080/safetybox/addUsers";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      fetch(url, {
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
            setAlreadyRegistered(true);
          }
          return response.json();
        })
        .then((data) => {
          navigate("/");
        });
    } catch (error) {
      console.error("Erreur lors de la creation : ", error);
    }
  };

  return (
    <div>
      <label for="email" class="form-label">
        Email
      </label>
      <input
        type="text"
        id="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {alreadyRegistered && (
        <span className="text-warning">Email already registered</span>
      )}
      <br />

      <label for="password" class="form-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div id="passwordHelpBlock" class="form-text">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </div>

      <br />
      <div className="btn btn-secondary" onClick={handleSubmit}>
        Creer
      </div>
      <br />

      <br />
      <a href="/">Back to Sign in</a>
    </div>
  );
}

export default UserCreationForm;
