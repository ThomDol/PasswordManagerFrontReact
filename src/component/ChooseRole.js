import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useParams } from "react-router-dom";

const ChooseRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const token = localStorage.getItem("accessToken");
  const [userEmailRoleToManage, setUserEmailRoleToManage] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/safetybox/users/" + id, {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:8080/safetybox/roles", {
        method: "PUT",
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
            throw new Error("Erreur HTTP, statut " + response.status);
          }
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
          } else {
            return "";
          }
        })
        .then((data) => {
          setUserEmailRoleToManage(data || "");
          navigate("/manageUsers", { replace: true });
        });
    } catch (error) {
      console.error("Erreur lors de la creation : ", error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Manage Role</h2>
      <form>
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
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChooseRole;
