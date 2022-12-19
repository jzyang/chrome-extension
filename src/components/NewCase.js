import React, {useState} from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import {useRest} from "../context/RESTContext";

function NewCase() {
	const { currentUser, logout } = useAuth();

	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [incidentNo, setIncidentNo] = useState('');
	const [firstName, setFirstName] = useState(currentUser.email);

	const { createIncident } = useRest();

	async function handleCreateCase(e) {
		e.preventDefault() // Prevent refresh

		try {
			setError("");
			// Prevent user from clicking login after already having clicked it
			setLoading(true);
			setIncidentNo(await createIncident());
			console.log("New incident number is: " + incidentNo);
		} catch (error) {
			console.log(error.message);
			setError("Failed to Create a New Case");
		}
		setLoading(false);
	}

	async function handleLogout(e) {
		setError("");

		try {
			await logout();
			navigate("/");
		} catch (error) {
			setError("Failed to successfully log out for: " + currentUser.email);
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">{currentUser.email}</h2>
					{incidentNo && <Alert variant="success">{incidentNo}</Alert>}
					{error && <Alert variant="danger">{error}</Alert>}
					<Button disabled={loading} className="w-100" type="submit" onClick={handleCreateCase}>
						Create Case
					</Button>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button className="w-100" variant="link" onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</>
	);
}

export default NewCase;