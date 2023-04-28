import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserEditForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${user._id}`, formData);
      onSubmit(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-form-container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>Edit User</h2>
        <label>First Name</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>
          Admin
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isAdmin: e.target.checked }))
            }
          />
        </label>
        <div className="edit-form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      <style jsx>{`
        .edit-form-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .edit-form {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          width: 400px;
          box-sizing: border-box;
        }

        .edit-form-buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}

export default UserEditForm;
