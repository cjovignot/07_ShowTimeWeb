import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const profile_comp = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <div>prout</div>
      {user && (
        <div>
          <h2>User Info:</h2>
          <p>
            Name: {user.firstname} {user.lastname}
          </p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default profile_comp;
