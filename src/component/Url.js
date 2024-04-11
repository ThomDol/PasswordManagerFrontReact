import React, { useEffect, useState } from "react";
import TokenContext from "./TokenProvider";
import { useContext } from "react";

const Url = () => {
  const { token } = useContext(TokenContext);
  let url = "https://localhost:8080/safetybox/credentials/4";
  const [urlSiteList, setUrlSiteList] = useState([]);

  useEffect =
    (() => {
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
    },
    [urlSiteList]);

  return (
    <div>
      <h1>Liste Urls</h1>
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
          {urlSiteList.map((data) => {
            <tr>
              <th scope="row">&#10003;</th>
              <td>data.url</td>
              <td>data.loginId</td>
              <td>data.password</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Url;
