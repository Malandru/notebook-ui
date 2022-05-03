import React from 'react';
import { Button, TextField } from '@mui/material';
import API from 'api/Rest';
import User from 'user/User'
import { useNavigate } from 'react-router-dom';

function Login() {
    const user:User = new User();
    const navigate = useNavigate();

    function handleLogin(event: React.SyntheticEvent) {
        event.preventDefault();
        const response = API.login(user);
        response.then(user => {
            navigate('/', {state: user})
        })
            .catch(serverError => console.log(serverError));
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <TextField
                required
                id='outlined-username'
                label='Username'
                onChange={e => user.username = e.target.value}
                />
                <TextField
                required
                id='outlined-password'
                label='Password'
                type="password"
                autoComplete="current-password"
                onChange={e => user.password = e.target.value}
                />
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </div>
    );
}

export default Login;