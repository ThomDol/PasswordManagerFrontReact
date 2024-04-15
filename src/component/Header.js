import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="border rounded bg-primary row">
      <div className="col-11 text-light">Bienvenue dans votre coffre fort</div>
      <div className="col-1 justify-content-end">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => navigate("/manageUsers")}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Header;
