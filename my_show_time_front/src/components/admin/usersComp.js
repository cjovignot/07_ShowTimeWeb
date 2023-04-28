import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserEditForm from "./UserEditComp";

const handleDelete = async (itemId, setDataUsers) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/users/${itemId}`
    );
    setDataUsers(prevTickets => prevTickets.filter(item => item._id !== itemId));
  } catch (error) {
    console.error(error);
  }
};

function adminUsers() {
  const [dataUsers, setDataUsers] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => setDataUsers(response.data))
      .then((response) => response)
      .catch((error) => console.error(error));
  }, []);
  console.log(dataUsers);

  useEffect(() => {
    if (!showEditForm) {
      axios
        .get("http://localhost:3000/users")
        .then((response) => setDataUsers(response.data))
        .catch((error) => console.error(error));
    }
  }, [showEditForm]);

  const handleEdit = (item) => {
    setSelectedUser(item);
    setShowEditForm(true);
  };

  const handleEditFormSubmit = (formData) => {
    axios
      .put(`http://localhost:3000/users/${selectedUser._id}`, formData)
      .then(() => {
        setShowEditForm(false);

        axios
          .get("http://localhost:3000/users")
          .then((response) => setDataUsers(response.data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const handleEditFormCancel = () => {
    setShowEditForm(false);
  };

  return (
    <div className="admin_users">
      <Link href="/admin"><button className="btn" id="back_button">Back</button></Link>
      <h1 className="text-3xl font-bold">USERS MANAGER PAGE</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th><h3>ID</h3></th>
              <th><h3>FIRSTNAME</h3></th>
              <th><h3>LASTNAME</h3></th>
              <th><h3>EMAIL</h3></th>
              <th><h3>STATUS</h3></th>
            </tr>
          </thead>
          {dataUsers && dataUsers.map((item, i) => (
            <tbody>
              <td key={i}>{item._id}</td>
              <td key={i}>{item.firstname}</td>
              <td key={i}>{item.lastname}</td>
              <td key={i}>{item.email}</td>
              {item.isAdmin == true && (<td key={i}><b>Admin</b></td>)}
              {item.isAdmin == false && <td key={i}>User</td>}
              <td>
                <button className="btn btn-info" onClick={() => handleEdit(item)}>EDIT</button>
                <button className="btn btn-outline btn-error" onClick={() => handleDelete(item._id, setDataUsers)}>DELETE</button>
              </td>
            </tbody>
          ))}
        </table>
      </div>
      {showEditForm && (
        <UserEditForm
          user={selectedUser}
          onSubmit={handleEditFormSubmit}
          onCancel={handleEditFormCancel}
        />
      )}
    </div>
  );
}

export default adminUsers;
