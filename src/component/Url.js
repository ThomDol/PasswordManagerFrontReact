import React, { useEffect, useState } from 'react';

const Url = () => {
    let url = "https://localhost:8080/safetybox/credentials/4";
    const [urlSiteList, setUrlSiteList] = useState([]);

    useEffect = (() => {
        fetch(url).then(response => {
            return response.json();
        })
            .then(data => { setUrlSiteList(data); })
            .catch(error => { console.error(error); })
    }, [urlSiteList]);



    return (
        <div>
            <h1>Liste Urls</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">&#10003</th>
                        <th scope="col">Url</th>
                        <th scope="col">LoginId</th>
                        <th scope="col">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {urlSiteList.map(url => {
                        <tr>
                            <th scope="row">&#10003</th>
                            <td>url.url</td>
                            <td>url.loginId</td>
                            <td>url.password</td>
                        </tr>
                    }
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default Url;