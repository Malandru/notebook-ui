import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Service from './Service';
import User from './user/User'
import ServerError from './ServerError';
import UserRequest from './user/UserRequest';

function App() {
  const dev = new User();
  dev.username = "dev-user";
  dev.password = "development";
  const req = new UserRequest();
  req.username = dev.username;
  const service = new Service(dev.username, dev.password);
  const response = service.post<User>("user/details", req);
  response.then( user => {
    console.log(user);
  })
  .catch(error => {console.log(error);})

  return (
    <div className="App">
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
