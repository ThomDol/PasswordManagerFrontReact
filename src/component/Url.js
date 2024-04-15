import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const Url = () => {
  const [idUserConnected, setIdUserConnected] = useState();
  const token = Cookies.get("accessToken");
  let urlGetId =
    "http://localhost:8080/safetybox/users/getByEmail/" + Cookies.get("email");
  let url = "http://localhost:8080/safetybox/credentials/" + idUserConnected;
  const [urlSiteList, setUrlSiteList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (idUserConnected !== "") {
      display();
    }
  }, [idUserConnected]);

  useEffect(() => {
    getUserId();
  }, [urlSiteList]);

  const getUserId = () => {
    fetch(urlGetId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIdUserConnected(data.id);
        Cookies.set("idUserConnected", idUserConnected);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const display = () => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUrlSiteList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    alert("ok");
    const urlDelete = "http://localhost:8080/safetybox/credentials/" + id;
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette information ?"
    );
    if (isConfirmed) {
      try {
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
          .then((data) => {
            console.log("Add");
            navigate("/main");
          });
      } catch (error) {
        console.error("Erreur lors de la creation : ", error);
      }
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
              <th scope="row">
                <button
                  className="btn btn-light"
                  onClick={() => handleDelete(data.id)}
                >
                  &#10060;
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Url;
