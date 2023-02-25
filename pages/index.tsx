import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Container, Box, Typography, TextField, Button, Link, Grid } from '@mui/material'
import { useState, useEffect } from 'react'

interface Credentials {
  email: string;
  password: string;
}

//convert to string
function convertToString(value: FormDataEntryValue | null): string {
  return value !== null ? value.toString() : "";
}

//validation
function validateCredentials(email: string, password: string): Credentials {
  const errors: Credentials = {email: "", password: ""};

  if (!email) {
    errors["email"] = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors["email"] = 'Invalid email format.';
  }

  if (!password) {
    errors["password"] = 'Password is required.';
  } else if (password.length < 8) {
    errors["password"] = 'Password must be at least 8 characters.';
  }

  return errors;
}


const Home: NextPage = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    // Redirect to dashboard page
    window.location.href = '/dashboard';
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
