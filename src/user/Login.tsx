import React, { useState } from 'react';
import { Avatar, Box, Button, Checkbox, Container, createTheme, FormControlLabel, LinearProgress, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import API from 'api/Rest';
import { IUser } from 'user/User'
import { useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { EventAlert, EventNotification, UI } from 'xdomain/EventAlert';
import Session from 'user/Session';

function Login() {
  const [formUser, setFormUser] = useState<IUser>({username: "", password: ""});
  const [eventAlert, setEventAlert] = useState(new EventAlert());
  const navigate = useNavigate();

  function handleLogin(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(formUser);

    setEventAlert(eventAlert.asChangedUI(UI.LOADING));
    const response = API.login(formUser);

    response.then(user => {
      Session.storeUser(user);
      navigate('/');
    })
      .catch(serverError => {
        console.log(serverError);
        setEventAlert( eventAlert.asServerError(serverError) );
      });
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <EventNotification event={eventAlert} />
      <Container component="main" maxWidth="xs">
        <Box className='AvatarBox'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={e => formUser.username = e.target.value}
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
              onChange={e => formUser.password = e.target.value}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={eventAlert.hasProgress(UI.LOADING)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Sign In</Button>

            {eventAlert.hasProgress(UI.LOADING) && <LinearProgress color="secondary" />}
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  );
}

export default Login;