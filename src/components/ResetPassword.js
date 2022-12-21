import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function ResetPassword() {
	const emailRef = useRef();

	const { resetPassword } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault() // Prevent refresh

		setMessage("");
		setError("");
		// Prevent user from clicking login after already having clicked it
		setLoading(true);

		try {
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for password reset instructions");
		} catch (error) {
			setError("Reset failed for: " + emailRef.current.value);
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Forgot Password</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={ handleSubmit }>
						<Form.Group id="email" className="mb-4">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required/>
						</Form.Group>

						<Button disabled={loading} className="w-100" type="submit">
							Reset Password
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/login">Login</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an Account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	);
}

export default ResetPassword;