import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';



function Signup() {
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
	const handleSubmit=(e)=>{
	if(password!=confPassword)
	{
		// if 'password' and 'confirm password'
		// does not match.
		alert("password Not Match");
	}
	else{
		// display alert box with user
		// 'name' and 'email' details .
		alert('A form was submitted with Firstname :"' + firstname +
		'" ,Lastname :"'+lastname +'" and Email :"' + email + '"');
	}
	e.preventDefault();

	}
return (
	<div className="App">
	<header className="App-header">
	<form onSubmit={(e) => {handleSubmit(e)}}>
	{/*when user submit the form , handleSubmit()
		function will be called .*/}
	<h2> Show time !! </h2>
	<h3> Sign-up for awesome concerts </h3>
	<img src="/gfg.png" /> {/*image in the center of the circle ?.*/}
		<label >
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
		<input className = "submitbutton" type="submit" value="Submit"/>
	
	</form>
	</header>
	</div>
);
}

export default Signup;

