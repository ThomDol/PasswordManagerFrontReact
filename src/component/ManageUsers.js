import React from "react";
import { useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <h1 className="bg-primary text-center">Users List</h1>
    </div>
  );
};

export default ManageUsers;
