import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import interdit from "../assets/interdit.jpg";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

const ManageUsers = ({ }) => {
  const token = Cookies.get("accessToken");
  const url = "http://localhost:8080/safetybox/users";
  const [users, setUsers] = useState([]);
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

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
  }, [token]);

  const manage = (id) => {
    Cookies.set("idUserToManageRole", id);
    navigate(`/changeRole/${id}`);
  };

  return (
    <div>
      <Header />
      {isAllowed ? (
        <div>
          <h1 className="text-center">Users List</h1>
          <br />
          <br></br>
          <br></br>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">UserEmail</th>
                <th scope="col">role</th>
                <th scope="col"></th>
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
                        <button
                          className="btn btn-secondary"
                          onClick={() => manage(data.id)}
                        >
                          Manage User
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-light"
                          onClick={() => delete data.id}
                        >
                          &#10060;
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key={`${index}`}>
                    <td>{data.email}</td>
                    <td>NO ROLE</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => manage(data.id)}
                      >
                        Manage User
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-light"
                        onClick={() => delete data.id}
                      >
                        &#10060;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="col mx-auto text-center" style={{ marginTop: "15%" }}>
          <img src={interdit} style={{ width: "30%", height: "30%" }} />
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
