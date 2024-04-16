import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import ChooseRoleModal from "./ChooseRoleModal";

const ManageUsers = () => {
  const token = Cookies.get("accessToken");
  const url = "http://localhost:8080/safetybox/users";
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        setIsAllowed(true);
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [users]);

  const handleManageRole = (userEmail) => {
    setSelectedUser(userEmail);
    setShowModal(true);
    console.log(selectedUser);
    console.log(showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveRole = (userEmail, roles) => {
    // Logique pour enregistrer les rôles de l'utilisateur
    console.log("Rôles de l'utilisateur", userEmail, ":", roles);
  };

  return (
    <div>
      {isAllowed ? (
        <div>
          <h1 className="bg-primary text-center">Users List</h1>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">UserEmail</th>
                <th scope="col">role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((data, index) => {
                const roles = data.appRoles ? data.appRoles : [];
                return roles.length > 0 ? (
                  roles.map((role, roleIndex) => (
                    <tr key={`${index}-${roleIndex}`}>
                      <td>{data.email}</td>
                      <td>{role.roleName}</td>
                      <td>
                        {data.email && (
                          <button
                            className="btn btn-light"
                            onClick={() => handleManageRole(data.email)}
                          >
                            Manage Role
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key={`${index}`}>
                    <td>{data.email}</td>
                    <td>NO ROLE</td>
                    <td>
                      {data.email && (
                        <button
                          className="btn btn-light"
                          onClick={() => handleManageRole(data.email)}
                        >
                          Manage Role
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showModal ? (
            <ChooseRoleModal
              onClose={handleCloseModal}
              onSave={handleSaveRole}
              userEmail={selectedUser}
            />
          ) : null}
        </div>
      ) : (
        <h1>Vous n'êtes pas autorisés</h1>
      )}
    </div>
  );
};

export default ManageUsers;
