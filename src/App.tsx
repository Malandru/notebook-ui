import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from 'xdomain/Login';
import User from 'user/User';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  const location = useLocation();
  const user:User = location.state as User;

  if(user == null || !user.enabled)
    return Login();

  return (
    <div>
      hello world
    </div>
  );
}

function ExampleApp() {
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
  )
}

export default App;
