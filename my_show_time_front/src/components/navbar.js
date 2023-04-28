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
        <nav className="navbar">
          <div className="navbar_left">
            <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png" className="home-logo" alt="logo"/>

            <Link href="/" className="btn btn-outline">Home</Link>

            {!user && (
              <Link href="/Signup" className="btn btn-outline">Sign up</Link>
            )}
            {user ? (
              <>
                <div className="btn btn-circle"> 
                  <b>{user.firstname[0]}</b>
                  <b>{user.lastname[0]}</b>
                </div>

                {/* <div className="profile_buttons"> */}
                  <Link href="/user_profile" className="btn btn-outline">Profile</Link>
                  <Link href="" onClick={handleLogout} className="btn btn-outline">Logout</Link>
                {/* </div> */}
                {isAdmin && ( // Add this condition
                  <Link href="/admin" className="btn btn-outline">Admin</Link>
                )}
              </>
            ) : (
              <Link href="" onClick={handleLoginToggle} className="btn btn-outline"><div >Login</div></Link>
            )}
          </div>
          
        
          <div className="navbar_right">
            <form onSubmit={handleSearchSubmit}>
              <input type="text" name="search" id="search" />
              <button type="submit" className="btn btn-outline">
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
