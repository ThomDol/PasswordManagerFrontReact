import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import interdit from "../assets/interdit.jpg";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const ManageUsers = ({}) => {
  const token = Cookies.get("accessToken");
  const url = "http://localhost:8080/safetybox/users";
  const [users, setUsers] = useState([]);
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Manage RoleModal
                        </button>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Modal title
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
                                  <p>Changing role for: {data.email}</p>
                                  <label>
                                    <input
                                      id="adminRole"
                                      name="role"
                                      type="radio"
                                      value="ADMIN"
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
                                    />
                                    USER
                                  </label>
                                  <br />
                                  <br />
                                  <button
                                    className="btn btn-primary"
                                    type="button"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
                        onClick={() => setShowModal(!showModal)}
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
