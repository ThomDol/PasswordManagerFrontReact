import React from "react";
import { useState } from "react";

const ChooseRoleModal = ({ onClose, onSave, userEmail }) => {
  const [roles, setRoles] = useState({
    admin: false,
    user: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRoles((prevRoles) => ({
      ...prevRoles,
      [name]: checked,
    }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Gérer le rôle de {userEmail}</h2>
        <label>
          Admin:
          <input
            type="checkbox"
            name="admin"
            checked={roles.admin}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          User:
          <input
            type="checkbox"
            name="user"
            checked={roles.user}
            onChange={handleCheckboxChange}
          />
        </label>
        <button>Enregistrer</button>
        <button onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
};

export default ChooseRoleModal;
