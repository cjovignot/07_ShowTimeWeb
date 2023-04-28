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
  const [isAdmin, setIsAdmin] = useState(false);
  const updateIsAdmin = () => {
    const storedIsAdmin = Cookie.get("isAdmin");
    if (storedIsAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const storedUser = Cookie.get("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    updateIsAdmin();
  }, []);

  useEffect(() => {
    const updateUserFromCookie = () => {
      const storedUser = Cookie.get("userInfo");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      updateIsAdmin();
    };

    const cookieChangeListener = () => {
      updateUserFromCookie();
    };

    const loginSuccessListener = () => {
      updateUserFromCookie();
    };

    window.addEventListener("updateUserFromCookie", cookieChangeListener);
    window.addEventListener("loginSuccess", loginSuccessListener);

    return () => {
      window.removeEventListener("updateUserFromCookie", cookieChangeListener);
      window.removeEventListener("loginSuccess", loginSuccessListener);
    };
  }, []);

  const handleLoginClose = () => {
    const storedUser = Cookie.get("userInfo");
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
    Cookie.remove("isAdmin");
    setUser(null);
    updateIsAdmin();
    router.push("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const artistName = event.target.elements.search.value;
    router.push(`/search?artist_name=${artistName}`);
  };
  return (


    <div>
      <header>
        <nav className="navbarwankers background">
          <div className="nav-list">
          
            <div className="menunavbar">
            <div className="logo">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png" 
              className="home-logo" alt="logo"/>
            </div>
            <div><Link href="/" className="item-nav">Home</Link></div>
              {!user && (
                <div><Link href="/Signup" className="item-nav">Sign up</Link></div>
              )}
            <div className="nav-list2">
              {user ? (
                <>
                  <div className="w-24 rounded-xl"  > 
                    {user.firstname[0]}
                    {user.lastname[0]}
                  </div>
                  <div>
                  <Link href="/user_profile">
                    <button className="item-nav">Profile</button>
                  </Link>
                  <button onClick={handleLogout} className="item-nav">Logout</button>
                  </div>
                  {isAdmin && ( // Add this condition
              <div><Link href="/admin" className="item-nav">Admin</Link></div>
            )}
                </>
              ) : (
                <button onClick={handleLoginToggle} className="item-nav">Login</button>
              )}
            </div></div>
           
          
          <div className="rightNav">
            <form onSubmit={handleSearchSubmit}>
              <input type="text" name="search" id="search" />
              <button type="submit" className="btn">
                Search
              </button>
            </form>
          </div>
          </div>
        </nav>
      </header>

      {showLogin && <Login onClose={handleLoginClose} />}
      {showProfile && user && <Profile user={user} />}

    </div>
  );
};

export default Navbar;
