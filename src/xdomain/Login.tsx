import React, { useState } from 'react';
import { Button, Card, TextField } from '@mui/material';
import API from 'api/Rest';
import User from 'user/User'

function Login() {
    const [user, setUser] = useState(new User());

    function handleLogin(event: React.SyntheticEvent) {
        event.preventDefault();
        const response = API.login(user);
        response.then(user => console.log(user))
            .catch(serverError => console.log(serverError));
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <TextField
                required
                id='outlined-username'
                label='Username'
                value={user.username}
                onChange={e => setUser( (user) => {
                    user.username = e.target.value;
                    return user;
                })}
                />
                <TextField
                required
                id='outlined-password'
                label='Password'
                type="password"
                autoComplete="current-password"
                value={user.password}
                onChange={e => setUser( (user) => {
                    user.password = e.target.value;
                    return user;
                })}
                />
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </div>
    );
}

export default Login;