import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Container, Box, Typography, TextField, Button, Link, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { convertToString, validateCredentials } from '../lib/validate'

interface data {
	email: string,
	password: string,
}

const Home: NextPage = () => {
	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({ email: '', password: '' });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formdata = new FormData(e.currentTarget);
		const error = validateCredentials(convertToString(formdata.get('email')), convertToString(formdata.get('password')))
		setError((prevState) => ({ ...prevState, email: error.email, password: error.password }));
		console.log(error)

		const postdata:data = {
			email: convertToString(formdata.get('email')),
			password: convertToString(formdata.get('password')),
		}
		
		if (error.email === '' && error.password === ''){
			console.log('no error')
			const res = await fetch('/api/login', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({ email: postdata.email, password: postdata.password })
			});
		
			const data = await res.json();
			console.log(data.message)
			if (!res.ok) {
				setMessage(data.message);
			  	return;
			}
		
			// Redirect to dashboard page
			window.location.href = '/';
		};
	
	};


	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/message', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include' // Send cookie
			});

			const data = await res.json();

			if (!res.ok) {
				setMessage(data.message);
				return;
			}

			setMessage(`Welcome, ${data.email}!`);
		};

		fetchData();
	}, []);

	return (
		<Layout
			title='login'
			description='login'
		>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography variant="h4">Login</Typography>
					<p>message: {message}</p>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							error={error.email != ''}
							helperText={error.email != '' ? error.email : ''}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							error={error.password != ''}
							helperText={error.password != '' ? error.password : ''}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Login
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</Layout>
	)
}

export default Home
