import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from './Header';

const ChooseRoleModal = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const token = Cookies.get("accessToken");
  const userId = Cookies.get("idUserToManageRole");
  const [userEmailRoleToManage, setUserEmailRoleToManage] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/safetybox/users/" + userId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserEmailRoleToManage(data.email);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = () => {
    alert(role + " " + userEmailRoleToManage);
    try {
      fetch("http://localhost:8080/safetybox/addRoleToUser", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmailRoleToManage,
          roleName: role,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            alert("erreur requete");
            throw new Error("Erreur HTTP, statut " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          alert("requete effectuee");
          console.log(data);
          navigate("./manageUsers");
        });
    } catch (error) {
      console.error("Erreur lors de la creation : ", error);
    }
  };


  return (
    <div>
      <Header />
      <h2>Manage Role</h2>
      <form >
        <p>Changing role for: {userEmailRoleToManage}</p>
        <label>
          <input
            id="adminRole"
            name="role"
            type="radio"
            value="ADMIN"
            checked={role === "ADMIN"}
            onChange={handleRoleChange}
          />
          ADMIN
        </label>
        <br />
        <label>
          <input
            id="userRole"
            name="role"
            type="radio"
            value="USER"
            checked={role === "USER"}
            onChange={handleRoleChange}
          />
          USER
        </label>
        <br />
        <br />
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default ChooseRoleModal;
