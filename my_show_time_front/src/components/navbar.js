import Link from "next/link";
import { useState, useEffect } from "react";
import Login from "./login";
import Profile from "./profile_comp";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const handleLoginToggle = () => {
    setShowLogin((prev) => !prev);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginClose = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setShowLogin(false);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookie.remove("userInfo");
    setUser(null);
    router.push("/");
  };

  return (
    <div>
      <header>
        <nav className="navbar background">
          <ul className="nav-list">
            <div className="logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png"
                className="home-logo"
                alt="logo"
              />
            </div>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <a href="#courses">Sign Up</a>
            </li>
            <li>
              {user ? (
                <>
                  <span>
                    {user.firstname[0]}
                    {user.lastname[0]}
                  </span>
                  <Link href="/user_profile">
                    <button>Profile</button>
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button onClick={handleLoginToggle}>Login</button>
              )}
            </li>
          </ul>
          <div className="rightNav">
            <input type="text" name="search" id="search" />
            <button className="btn btn-sm">Search</button>
          </div>
        </nav>
      </header>

      {showLogin && <Login onClose={handleLoginClose} />}
      {showProfile && user && <Profile user={user} />}
    </div>
  );
};

export default Navbar;
