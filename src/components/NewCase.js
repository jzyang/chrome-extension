import React, {useRef, useState} from 'react';
import {Button, Card, Alert, Form} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import {useRest} from "../context/RESTContext";

const STEP = 1;
const MIN = 1;
const MAX = 3;
const DEFAULT = 1;

function NewCase() {
	const descriptionRef = useRef();
	const severityRef = useRef();
	const urgencyRef = useRef();

	const { currentUser, logout } = useAuth();

	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [incident, setIncident] = useState();

	const { createIncident } = useRest();

	console.log(currentUser)

	const createScale = () => {
		let scale = [];

		for (let i = MIN; i <= MAX; i = i + STEP) {
			scale.push(
				<span key={i} className="scale_item">
          {i}
        </span>
			);
		}

		return scale;
	};

	async function handleCreateCase(e) {
		e.preventDefault() // Prevent refresh

		try {
			setError("");
			// Prevent user from clicking login after already having clicked it
			setLoading(true);
			const newIncident = {
				active: true,
				description: descriptionRef.current.value,
				severity: severityRef.current.value,
				urgency: urgencyRef.current.value,
				priority: 3,
				userId: currentUser.uid
			}
			setIncident(await createIncident(newIncident));
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
			localStorage.removeItem("user");
			navigate("/login");
		} catch (error) {
			setError("Failed to successfully log out for: " + currentUser.email);
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">{currentUser.email}</h2>
					{incident && <Alert variant="success">{incident.number}</Alert>}
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={ handleCreateCase }>
						<Form.Group id="description" className="mb-4">
							<Form.Label>Incident Description</Form.Label>
							<Form.Control type="text" ref={descriptionRef} required/>
						</Form.Group>
						<Form.Group id="severity" className="mb-5">
							<Form.Label>Severity</Form.Label>
							<Form.Range ref={severityRef}
							min={MIN} max={MAX} step={STEP} defaultValue={DEFAULT}/>
							<ul className="range-labels">
								<li>High</li>
								<li>Medium</li>
								<li>Low</li>
							</ul>
						</Form.Group>
						<Form.Group id="urgency" className="mb-5">
							<Form.Label>Urgency</Form.Label>
							<Form.Range ref={urgencyRef}
										min={MIN} max={MAX} step={STEP} defaultValue={DEFAULT}/>
							<ul className="range-labels">
								<li>High</li>
								<li>Medium</li>
								<li>Low</li>
							</ul>
						</Form.Group>

						<Button disabled={loading} className="w-100" type="submit">
							Create Incident
						</Button>
					</Form>
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