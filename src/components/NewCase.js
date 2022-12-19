import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();

	const { login } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault() // Prevent refresh

		try {
			setError("");
			// Prevent user from clicking login after already having clicked it
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
		} catch (error) {
			console.log(error.message);
			setError("Failed to Log in User");
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Log In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={ handleSubmit }>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required/>
						</Form.Group>
						<Form.Group id="password" className="mb-4">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required/>
						</Form.Group>

						<Button disabled={loading} className="w-100" type="submit">
							Log In
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an Account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	);
}

export default Login;