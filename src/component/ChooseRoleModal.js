import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChooseRoleModal = ({ index, email }) => {
  const [role, setRole] = useState("");
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

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
          email: email,
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
          console.log(data);
        });
    } catch (error) {
      console.error("Erreur lors de la creation : ", error);
    }
  };

  return (
    <div
      className="modal fade"
      id={`exampleModal-${index}`}
      tabindex="-1"
      aria-labelledby={`exampleModalLabel-${index}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`exampleModalLabel-${index}`}>
              Role Change
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <p>Changing role for: {email}</p>
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
                onClick={handleSubmit}
                type="button"
              >
                Submit
              </button>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRoleModal;
