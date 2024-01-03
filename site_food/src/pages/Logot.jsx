import '../styles/Logot.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { registerUser, login } from "../userService";

const Logout = () => {
	const navigate = useNavigate();

	const [input, setInput] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInput({
			...input,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log("hiiiiiii");
			const response = await registerUser(input.email, input.password);

			if (response) {
				console.log("User registered successfully:");
				const res = await login(input.email, input.password);
				if (res.token) {
					localStorage.setItem("token", res.token);
					navigate("/");
				} else {
				}
			} else {
				console.error("Registration failed:");
			}
		} catch (error) {
			console.error("Error during registration:", error);
		}
	}
	return (
		<div className='logot-page'>
			<div className="form-container">
				<p className="title">Sign up</p>
				<form className="form" onSubmit={handleSubmit}>
					<div className="input-group-logot">
						<label htmlFor="password2" >Username</label>
						<input type="text" name="confirmPassword" id="password2" placeholder='Enter your name..' onChange={handleInputChange} required />
					</div>
					<div className="input-group-logot">
						<label htmlFor="email">Password</label>
						<input type="password" name="email" id="email" placeholder="name@gmail.com" onChange={handleInputChange} required />
					</div>
					<div className="input-group-logot">
						<label htmlFor="password">Confirm Password</label>
						<input type="password" name="password" id="password" placeholder="" onChange={handleInputChange} required />
					</div>
					<button className="sign">Sign Up</button>
				</form>

				<p className="signup">Do you already have an account?
					<button className="sign" onClick={handleSubmit}>
						Sign Up
					</button>
				</p>
			</div>
		</div>
	);
}

export default Logout;