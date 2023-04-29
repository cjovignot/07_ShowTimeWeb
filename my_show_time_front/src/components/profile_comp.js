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
  const [message, setMessage] = useState("");

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
      const updatedUser = response.data.data;
      setUser(updatedUser);
      setFormData({
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
      });
      setEditing(false);
      setMessage("Profile updated successfully!");

      // update user cookie with the updated user object
      Cookies.set("userInfo", JSON.stringify(updatedUser));
      const updateUserEvent = new CustomEvent("updateUserFromCookie");
      window.dispatchEvent(updateUserEvent);
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("There was an error updating your profile.");
    }
  };

  return (
    <div className="profileside mr-10">
      <div className="profiltitle">
        <h1 className="text-3xl font-bold">My profile</h1>
      </div>
      {user && (
        <div className="contentprofil">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <table>
                <tr>
                  <td className="text-left">
                    <b>First Name</b>
                  </td>
                  <td>
                    <input
                      className="input input-bordered w-full max-w-xs"
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left">
                    <b>Last Name</b>
                  </td>
                  <td>
                    <input
                      className="input input-bordered w-full max-w-xs"
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left">
                    <b>Email</b>
                  </td>
                  <td>
                    <input
                      className="input input-bordered w-full max-w-xs"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      className="btn mt-5 btn-error"
                      type="button"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  </td>
                  <td>
                    <button className="btn mt-5 btn-success" type="submit">
                      Save
                    </button>
                  </td>
                </tr>
              </table>
            </form>
          ) : (
            <>
              {message && <p>{message}</p>}
              <div className="userprofileinfo">
                <p>
                  <b> Name: </b>
                  {user.firstname} {user.lastname}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
              </div>
              <button className="btn" onClick={() => setEditing(true)}>
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileComp;
