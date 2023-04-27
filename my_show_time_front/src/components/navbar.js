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

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   const searchinput = event.target.elements.search.value;
  //   router.push(`/search?=${searchinput}`);
  // };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const artistName = event.target.elements.search.value;
    router.push(`/search?artist_name=${artistName}`);
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
              <Link href="/Signup">Sign up</Link>
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
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          </ul>
          <div className="rightNav">
            <form onSubmit={handleSearchSubmit}>
              <input type="text" name="search" id="search" />
              <button type="submit" className="btn btn-sm">
                Search
              </button>
            </form>
          </div>
        </nav>
      </header>

      {showLogin && <Login onClose={handleLoginClose} />}
      {showProfile && user && <Profile user={user} />}
    </div>
  );
};

export default Navbar;
