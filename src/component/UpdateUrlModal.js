import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const UpdateUrlModal = () => {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  const [url, setUrl] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [urlToUpdate, setUrlToUpdate] = useState();
  const urlApi = "http://localhost:8080/safetybox/credentials/" + id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/safetybox/credentials/ById/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur HTTP, statut " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUrlToUpdate(data);
        setUrl(data.url);
        setLoginId(data.loginId);
        setPassword(data.password);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    try {
      fetch(urlApi, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          loginId: loginId,
          password: password,
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
          console.log("url :" + data.url + "& login : " + data.loginId);
          navigate("/main");
        });
    } catch (error) {
      console.error("Erreur lors de la creation : ", error);
    }
  };

  return (
    <div>
      <Header />
      <br />
      <h1 className="bg-primary border rounded text-center">Update</h1>
      <br />
      {urlToUpdate && (
        <>
          <label for="url" className="form-label">
            Url
          </label>
          <input
            type="text"
            id="url"
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <label for="loginId" className="form-label">
            LoginId
          </label>
          <input
            type="text"
            id="loginId"
            className="form-control"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <div
            className="btn btn-warning
      "
            onClick={handleUpdate}
          >
            Update
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateUrl;
