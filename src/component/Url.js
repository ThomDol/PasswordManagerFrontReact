import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Url = () => {
  const [idUserConnected, setIdUserConnected] = useState("");
  const [urlSiteList, setUrlSiteList] = useState([]);
  const token = Cookies.get("accessToken");
  const email = Cookies.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      getUserId();
    }
  }, [email]);

  useEffect(() => {
    if (idUserConnected !== "") {
      display();
    }
  }, [idUserConnected]);

  const getUserId = () => {
    fetch("http://localhost:8080/safetybox/users/getByEmail/" + email, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIdUserConnected(data.id);
        Cookies.set("idUserConnected", data.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const display = () => {
    if (idUserConnected !== "") {
      fetch("http://localhost:8080/safetybox/credentials/" + idUserConnected, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUrlSiteList(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDelete = (id) => {
    const urlDelete = "http://localhost:8080/safetybox/credentials/" + id;
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette information ?"
    );
    if (isConfirmed) {
      fetch(urlDelete, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur HTTP, statut " + response.status);
          }
          return response.json();
        })
        .then(() => {
          navigate("/main");
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression : ", error);
        });
    }
  };

  return (
    <div>
      <h1 className="text-center">Liste Urls</h1>
      <div className="btn btn-success" onClick={() => navigate("/AddNewUrl")}>
        Add
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Url</th>
            <th scope="col">LoginId</th>
            <th scope="col">Password</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {urlSiteList.map((data, index) => (
            <tr key={index}>
              <td onClick={() => navigate(`/updateUrl/${data.id}`)}>
                {data.url}
              </td>
              <td>{data.loginId}</td>
              <td>{data.password}</td>
              <td>
                <button
                  className="btn btn-light"
                  onClick={() => handleDelete(data.id)}
                >
                  &#10060;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Url;
