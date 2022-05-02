import React, { useState } from 'react';
import logo from './logo.svg';
import './css/App.css';
import User from './user/User'
import ServerError from './api/ServerError';
import { Button, Card, TextField } from '@mui/material';
import API from './api/Rest';

function App() {
  const user:User = new User();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    user.username = event.target.value;
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    user.password = event.target.value;
  }

  function handleLogin(){
    const response = API.login(user);
    response.then(user => console.log(user))
      .catch(serverError => console.log(serverError));
  }

  return (
    <div className="App">
      <Card>
        <p>A ver</p>
      </Card>
      <TextField
        required
        id="outlined-required-username"
        label="Username"
        onChange={handleUsernameChange}
      />
      <TextField
        required
        id="outlined-user-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={handlePasswordChange}
      />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
