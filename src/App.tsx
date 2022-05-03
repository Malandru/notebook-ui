import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from 'xdomain/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/app' element={<ExampleApp />} />
    </Routes>
    </BrowserRouter>
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
