import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";

const Url = () => {
  const [idUserConnected, setIdUserConnected] = useState();
  const token = Cookies.get("accessToken");
  let urlGetId =
    "http://localhost:8080/safetybox/users/" + Cookies.get("email");
  let url = "http://localhost:8080/safetybox/credentials/" + idUserConnected;
  const [urlSiteList, setUrlSiteList] = useState([]);

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
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const display = () => {
    console.log("url token : " + Cookies.get("accessToken"));
    getUserId();
    console.log(
      "email :" + Cookies.get("email") + " idUserConnected :" + idUserConnected
    );
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
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //useEffect = (display(), []);

  return (
    <div>
      <h1>Liste Urls</h1>
      <div className="btn btn-success" onClick={display}>
        Display
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Url</th>
            <th scope="col">LoginId</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          {urlSiteList.map((data, index) => (
            <tr key={index}>
              <th scope="row">&#10003;</th>
              <td>{data.url}</td>
              <td>{data.loginId}</td>
              <td>{data.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Url;
