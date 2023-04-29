import { useState } from "react";
import Cookie from "js-cookie";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const {
        token,
        user: { _doc: user },
      } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      Cookie.set(
        "userInfo",
        JSON.stringify({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        })
      );

      if (user.isAdmin) {
        Cookie.set("isAdmin", "true");
      }

      // Dispatch an event to notify Navbar of login success
      const loginSuccessEvent = new Event("loginSuccess");
      window.dispatchEvent(loginSuccessEvent);

      onClose();
    } else {
      setErrorMessage("Wrong email or password.");
    }
  };

  return (
    <div className="overlay">
      <div className="login">
        <h1 className="text-3xl font-bold text-black">LOGIN</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" className="nav-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="nav-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          
          <div className="button-group">
            <button className="btn btn-success" type="submit">Log In</button>
            <button class="btn btn-error" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
