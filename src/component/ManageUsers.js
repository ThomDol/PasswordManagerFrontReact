import React, { useEffect, useState } from "react";
import interdit from "../assets/interdit.jpg";
import Header from "./Header";
import ChooseRoleModal from "./ChooseRoleModal";

const ManageUsers = ({ }) => {
  const token = localStorage.getItem("accessToken");
  const url = "http://localhost:8080/safetybox/users";
  const [users, setUsers] = useState([]);
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



  return (
    <div>
      <Header />

      {isAllowed ? (
        <div>
          <h1 className="text-center">Users List</h1>
          <br />
          <br></br>
          <br></br>
          <div className="col-6 mx-auto">
            <table className="table table-striped">
              <thead className="table-dark">
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
                          <ChooseRoleModal index={data.id} email={data.email} />

                          <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target={`#exampleModal-${data.id}`}
                          >
                            Manage User's role
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={`${index}`}>
                      <td>{data.email}</td>
                      <td>NO ROLE</td>
                      <td>
                        <ChooseRoleModal index={data.id} email={data.email} />

                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal-${data.id}`}
                        >
                          Manage User's role
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
