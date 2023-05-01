import { useState } from "react";
import Cookie from "js-cookie";
import Link from "next/link";

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
    <div className="overlay z-800">
      {/* <div className="login"> */}

        <div className="login card w-96 bg-white opacity-90 text-neutral-content m-auto">
          
          <div className="items-center p-8 text-center">
          
            <h2 className="text-3xl font-bold items-center flex justify-center text-stone-950"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png" className="logo home-logo" alt="logo"/>LOGIN</h2>

            <form className="form" onSubmit={handleSubmit}>
              <br />
                <input className="input w-full max-h-10 text-black" placeholder="youremail@showtime.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <br />
              <br />
                <input className="input w-full max-h-10 text-black" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <br />

              <div>
                {errorMessage && (
                  <p className="alert alert-warning shadow-lg m-5 w-auto justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <b>{errorMessage}</b>
                  </p>
                )}
              </div>
              <p className="text-black">No account, please <Link href="/Signup"><b>SignUp</b></Link></p>
              <div className="flex justify-between">
                <button class="btn btn-error mt-6" type="button" onClick={onClose}>Cancel</button>
                <button className="btn btn-success mt-6" type="submit">SignIn</button>
              </div>
            </form>

          </div>
        </div>





      {/* </div> */}
    </div>
  );
};

export default Login;
