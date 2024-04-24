import React from "react";
import { useState, useEffect } from "react";



const UpdateUrlModal = ({ idModal }) => {
  const token = localStorage.getItem("accessToken");
  const [url, setUrl] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [urlToUpdate, setUrlToUpdate] = useState();
  const urlApi = "http://localhost:8080/safetybox/credentials/" + idModal;


  useEffect(() => {
    fetch("http://localhost:8080/safetybox/credentials/ById/" + idModal, {
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
          console.log(data);
        });
    } catch (error) {
      console.error("Erreur lors de la creation : ", error);
    }
  };

  return (
    <div className="d-flex flex-column">
      <div
        className="modal fade"
        id={`Modal-${idModal}`}
        tabindex="-1"
        aria-labelledby={`ModalLabel-${idModal}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">

              <div className="modal-body">
                <p className="fs-2"><b>Update Url :</b></p>

                {urlToUpdate && (
                  <form>
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
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUrlModal;
