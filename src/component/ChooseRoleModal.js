import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ChooseRoleModal = () => {
  const [role, setRole] = useState("");
  const userId = Cookies.get("idUserToManageRole");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez envoyer les données au serveur pour changer le rôle
    console.log(`Changer le rôle de`);
    // Après avoir soumis les données, vous pouvez rediriger l'utilisateur
    // vers une autre page, par exemple la page principale
  };

  return (
    <div>
      <h2>Manage Role</h2>
      <form onSubmit={handleSubmit}>
        <p>Changing role for:</p>
        <label>
          <input
            type="radio"
            value="Admin"
            checked={role === "Admin"}
            onChange={handleRoleChange}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            value="User"
            checked={role === "User"}
            onChange={handleRoleChange}
          />
          User
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChooseRoleModal;
