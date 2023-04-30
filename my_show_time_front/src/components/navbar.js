import Link from "next/link";
import { useState, useEffect } from "react";
import Login from "./login";
import Profile from "./profile_comp";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { themeChange } from "theme-change";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const handleLoginToggle = () => {
    setShowLogin((prev) => !prev);
  };

  useEffect(() => {
    themeChange(false);
  }, []);

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
        <nav className="navbar bg-slate-950">
          <div className="navbar_left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png"
              className="logo home-logo"
              alt="logo"
            />

            <Link href="/" className="btn btn-outline text-white">
              Home
            </Link>

            {!user && (
              <Link href="/Signup" className="btn btn-outline text-white">
                Sign up
              </Link>
            )}
            {user ? (
              <>
                <div className="btn btn-circle text-white">
                  <b>{user.firstname[0]}</b>
                  <b>{user.lastname[0]}</b>
                </div>

                {/* <div className="profile_buttons"> */}
                <Link
                  href="/user_profile"
                  className="btn btn-outline text-white"
                >
                  Profile
                </Link>
                <Link
                  href="/"
                  onClick={handleLogout}
                  className="btn btn-outline text-white"
                >
                  Logout
                </Link>
                {/* </div> */}
                {isAdmin && ( // Add this condition
                  <Link href="/admin" className="btn btn-outline text-white">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <Link
                href=""
                onClick={handleLoginToggle}
                className="btn btn-outline text-white"
              >
                <div>Login</div>
              </Link>
            )}
          </div>

          <div className="navbar_right">
            <form onSubmit={handleSearchSubmit}>
              <input type="text" name="search" id="search" className="mr-10" />
              {/* <button type="submit" className="btn btn-outline">
                Search
              </button> */}
            </form>

            {/* <label className="swap swap-rotate">
              <input type="checkbox" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"/>
              <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label> */}
          </div>
        </nav>
      </header>

      {showLogin && <Login onClose={handleLoginClose} />}
      {showProfile && user && <Profile user={user} />}
    </div>
  );
};

export default Navbar;
