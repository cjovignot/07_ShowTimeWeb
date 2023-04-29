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
      <form className="edit-form card w-96 bg-base-100 shadow-xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-black text-center">Edit User</h2>
        <label className="text-l font-bold text-black">First Name</label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xs"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <label className="text-l font-bold text-black">Last Name</label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xs"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <label className="text-l font-bold text-black">Email</label>
        <input
          type="email"
          className="input input-bordered input-info w-full max-w-xs"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label className="admin_label_edit text-l font-bold text-black">Admin<input
            type="checkbox"
            className="checkbox checkbox-info"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isAdmin: e.target.checked }))
            }
          />
        </label>
        <div className="edit-form-buttons">
          <button className="btn btn-error" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-success" type="submit">Save</button>
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
          background-color: #9fa6b4ed;
          padding: 20px;
          border-radius: 5px;
          width: auto;
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
