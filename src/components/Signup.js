import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useRest } from "../context/RESTContext";
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { signup } = useAuth();
	const { createUser } = useRest();

	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	console.log("Got to Signup.js")

	async function handleSubmit(e) {
		e.preventDefault() // Prevent refresh

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			// Prevent user from clicking submit while account is being created
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value)
				.then(resp => {
					const user = {
						firstName: firstNameRef.current.value,
						lastName: lastNameRef.current.value,
						email: resp.user.email,
						uid: resp.user.uid
					};

					return createUser(user);
				})
				.catch(error => console.log(error));
			navigate("/dash");
		} catch (error) {
			setError("Failed to create an account");
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={ handleSubmit }>
						<Form.Group id="firstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" ref={firstNameRef} required/>
						</Form.Group>
						<Form.Group id="lastName" className="mt-2">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" ref={lastNameRef} required/>
						</Form.Group>
						<Form.Group id="email" className="mt-2">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required/>
						</Form.Group>
						<Form.Group id="password" className="mt-2">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required/>
						</Form.Group>
						<Form.Group id="password-confirm" className="mt-2 mb-4">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required/>
						</Form.Group>

						<Button disabled={loading} className="w-100" type="submit">
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an Account? <Link to="/">Log In</Link>
			</div>
		</>
	);
}

export default Signup;