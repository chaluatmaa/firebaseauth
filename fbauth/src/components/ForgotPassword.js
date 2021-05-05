import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instructions");
		} catch {
			setError("Failed to Reset password");
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body className="mb-4">
					<h2 className="text-center">Password Reset</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>

						<Button
							disabled={loading}
							className="w-100 text-center mt-2"
							type="submit"
						>
							Reset Password
						</Button>
					</Form>
					<div className="mt-3 w-100 text-center">
						<Link to="/login">Log In</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an account ?<Link to="/signup"> Sign Up</Link>
			</div>
		</>
	);
}

export default Login;
