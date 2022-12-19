import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { currentUser, signup } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault() // Prevent refresh
		console.log("In the handle submit event")

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			// Prevent user from clicking submit while account is being created
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
		} catch {
			setError("Failed to create an account");
		}
		setLoading(false);
	}
	
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>
					{currentUser && currentUser.email}
					{error && <Alert variant="danger">{error}</Alert>}
					<Form className="mb-4" onSubmit={ handleSubmit }>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required/>
						</Form.Group>
					</Form>

					<Button disabled={loading} className="w-100" type="submit">
						Sign Up
					</Button>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an Account? Log In
			</div>
		</>
	);
}

export default Signup;