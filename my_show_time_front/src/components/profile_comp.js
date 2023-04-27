import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProfileComp = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    const storedUser = Cookies.get("userInfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        firstname: parsedUser.firstname,
        lastname: parsedUser.lastname,
        email: parsedUser.email,
      });
    }
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${user._id}`,
        formData
      );
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      {user && (
        <div>
          <h2>User Info:</h2>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <p>
                Name: {user.firstname} {user.lastname}
              </p>
              <p>Email: {user.email}</p>
              <button onClick={() => setEditing(true)}>Edit</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileComp;
