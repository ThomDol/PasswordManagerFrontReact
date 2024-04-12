import React, { useState } from "react";

function UserCreationForm() {
  const url = "http://localhost:8080/safetybox/addUsers";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            throw new Error("Erreur HTTP, statut " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("ok :" + data.email + "& " + data.password);
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
      <div className="btn" onClick={handleSubmit}>
        Creer
      </div>
    </div>
  );
}

export default UserCreationForm;
