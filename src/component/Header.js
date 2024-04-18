import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const deleteCookies = () => {
    const cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const logout = () => {
    deleteCookies();
    navigate("/");
  };

  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="./main">
          Liste
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="./manageUsers">
          Espace Admin
        </a>
      </li>
      <li class="nav-item">
        <button className="btn btn-primary" onClick={logout}>
          Deconnexion
        </button>
      </li>
    </ul>
  );
};

export default Header;
