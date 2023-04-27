import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './signup.module.css';



function SignupComponent() {
	const [firstname , setFirstname] = useState('');
	const [lastname , setLastname] = useState('');
	const [email , setEmail] = useState('');
	const [password , setPassword] = useState('');
	const [confPassword , setConfPassword] = useState('');

	// function to update state of firstname with
	// value enter by user in form
	const handleChange =(e)=>{
	setFirstname(e.target.value);
	}
	// function to update state of Lastname with value
	// enter by user in form
	const handleLastnameChange =(e)=>
	{setLastname(e.target.value);
	}
	// function to update state of email with value
	// enter by user in form
	const handleEmailChange =(e)=>{setEmail(e.target.value);
	}
	// function to update state of password with
	// value enter by user in form
	const handlePasswordChange =(e)=>{setPassword(e.target.value);
	}
	// function to update state of confirm password
	// with value enter by user in form
	const handleConfPasswordChange =(e)=>{setConfPassword(e.target.value);
	}
	// below function will be called when user
	// click on submit button .
	const handleSubmit=async (e)=>{
	if(password!=confPassword)
	{
		// if 'password' and 'confirm password'
		// does not match.
		alert("password Not Match");
	}
	else{
		// affichage alert box avec utilisateur
		// 'name' and 'email' détails .
		

		// Fetch


			e.preventDefault();
		  



			const response = await fetch("http://localhost:3000/users/signup", {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({ firstname, lastname, email, password }),
			});
			console.log(response);


	}
	e.preventDefault();


	}
return (
	<div className={styles.App}>
	<header className={styles.AppHeader}>

	<form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
	{/*when user submit the form , handleSubmit()
		function will be called .*/}
	<h2> Show time !! </h2>
	<h3> Sign-up for awesome concerts </h3>
	<div className="logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/128px-Disque_Vinyl.svg.png"
                className="home-logo"
                alt="logo"
              />
            </div>		<label >
		First name:
		</label><br/>
		<input type="text" value={firstname} required onChange={(e)=> {handleChange(e)}} /><br/>
		{ /*when user write in name input box , handleChange()
			function will be called. */}
			



		<label >
		Last name:
		</label><br/>
		<input type="text" value={lastname} required onChange={(e)=> {handleLastnameChange(e)}} /><br/>
			{ /*when user write in age input box , handleAgeChange()
			function will be called. */}
		<label>
		Email:
		</label><br/>
		<input type="email" value={email} required onChange={(e)=> {handleEmailChange(e)}} /><br/>
		{/* when user write in email input box , handleEmailChange()
			function will be called.*/}
		<label>
		Password:
		</label><br/>
		<input type="password" value={password} required onChange={(e)=> {handlePasswordChange(e)}} /><br/>
			{/* when user write in password input box ,
				handlePasswordChange() function will be called.*/}
		<label>
		Confirm Password:
		</label><br/>
		<input type="password" value={confPassword} required onChange={(e)=> {handleConfPasswordChange(e)}} /><br/>
				{/* when user write in confirm password input box ,
					handleConfPasswordChange() function will be called.*/}
		<input className = {styles.submitbutton} type="submit" value="Submit"/>

		
	
	</form>
	</header>
	</div>
);
}

export default SignupComponent;

