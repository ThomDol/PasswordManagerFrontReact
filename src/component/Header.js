import React from 'react';

const Header = () => {
    return (
        <div className="border rounded bg-primary row">

            <div className="col-11 text-light">Bienvenue dans votre coffre fort</div>
            <div className="col-1 justify-content-end">
                <button type="button" class="btn btn-success">Admin</button>
            </div>

        </div>
    );
};

export default Header;