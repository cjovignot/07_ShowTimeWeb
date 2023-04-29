import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/router";  
// import styles from "../styles/globals.css";

function SignupComponent() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // function to update state of firstname with
  // value enter by user in form
  const handleChange = (e) => {
    setFirstname(e.target.value);
  };
  // function to update state of Lastname with value
  // enter by user in form
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  // function to update state of email with value
  // enter by user in form
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // function to update state of password with
  // value enter by user in form
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // function to update state of confirm password
  // with value enter by user in form
  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };
  // below function will be called when user
  // click on submit button .
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        router.push("/");
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="AppHeader">
        <form
          className="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/*when user submit the form , handleSubmit()
		function will be called .*/}
          <h2 className="showtime"> Show time !! </h2>
          <h3> Sign-up for awesome concerts </h3>
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png" className="home-logo" alt="logo" />
          </div>
          <label>First name:</label>
          <br />
            <input type="text" value={firstname} required onChange={(e) => { handleChange(e); }} />
          <br />
          {/*when user write in name input box , handleChange()
			function will be called. */}
          <label>Last name:</label>
          <br />
            <input type="text" value={lastname} required onChange={(e) => { handleLastnameChange(e); }} />
          <br />
          {/*when user write in age input box , handleAgeChange()
			function will be called. */}
          <label>Email:</label>
          <br />
            <input type="email" value={email} required onChange={(e) => { handleEmailChange(e); }} />
          <br />
          {/* when user write in email input box , handleEmailChange()
			function will be called.*/}
          <label>Password:</label>
          <br />
            <input type="password" value={password} required onChange={(e) => {handlePasswordChange(e);}}/>
          <br />
          {/* when user write in password input box ,
				handlePasswordChange() function will be called.*/}
          <label>Confirm Password:</label>
          <br />
            <input type="password" value={confPassword} required onChange={(e) => {handleConfPasswordChange(e);}}/>
          <br />
          {/* when user write in confirm password input box ,
					handleConfPasswordChange() function will be called.*/}
          <p className="errormessage">{errorMessage}</p>
          <input className="btn btn-active" type="submit" value="Sign-up" />
        </form>



        <div className="card w-96 bg-neutral text-neutral-content">
          
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png" className="home-logo h-50 w-50"  alt="logo" />
          </div>
          <div className="card-body items-center text-center">

            <h2 className="card-title">SIGNUP</h2>

            <p>We are using cookies for no reason.</p>


            <br />
              <input type="text" value={firstname} placeholder="First name" required onChange={(e) => { handleChange(e); }} />
            <br />
            <br />
              <input type="text" value={lastname} placeholder="Last name" required onChange={(e) => { handleLastnameChange(e); }} />
            <br />
            <br />
              <input type="email" placeholder="email" value={email} required onChange={(e) => { handleEmailChange(e); }} />
            <br />
            <br />
              <input type="password" placeholder="Password" value={password} required onChange={(e) => {handlePasswordChange(e);}}/>
            <br />
            <br />
              <input type="password" placeholder="Confirm password" value={confPassword} required onChange={(e) => {handleConfPasswordChange(e);}}/>
            <br />

            <div className="card-actions justify-end">
              <p className="errormessage">{errorMessage}</p>
              <button className="btn btn-primary" type="submit" value="Sign-up">SignUp</button>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
export default SignupComponent;
