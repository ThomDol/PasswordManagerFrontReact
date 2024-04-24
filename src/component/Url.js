import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import UpdateUrlModal from "./UpdateUrlModal";
import Swal from 'sweetalert2';


const Url = () => {
  const [idUserConnected, setIdUserConnected] = useState();
  const [urlSiteList, setUrlSiteList] = useState([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (idUserConnected !== "") {
      display();
    }
  }, [idUserConnected]);

  useEffect(() => {
    if (idUserConnected !== "") {
      display();
    }
  }, [urlSiteList]);

  const getUserId = () => {
    fetch("http://localhost:8080/safetybox/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("idUserConnected", data.id);
        setIdUserConnected(data.id);
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
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette information ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
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
            navigate("/main");
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression : ", error);
          });
      }
    })
  };

  return (
    <div className="urlList text-center">
      <Header />
      <h1>Bienvenue dans votre coffre fort</h1>
      <br></br>
      <br></br>
      <br></br>
      <h2>Liste Urls</h2>
      <br />
      <div className="col-6 mx-auto">
        <button
          className="btn btn-success"
          onClick={() => navigate("/AddNewUrl")}
        >
          Add
        </button>
        <br />
        <br />

        <table className="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">Url</th>
              <th scope="col">LoginId</th>
              <th scope="col">Password</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {urlSiteList.map((data, index) => (
              <tr key={index}>
                <td >
                  {data.url}
                </td>
                <td>{data.loginId}</td>
                <td>{data.password}</td>
                <td>
                  <UpdateUrlModal idModal={data.id} />
                  <button
                    data-bs-toggle="modal" ù
                    data-bs-target={`#Modal-${data.id}`}
                    className="btn btn-light ">
                    &#128393;
                  </button>
                </td>
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
    </div>
  );
};

export default Url;
