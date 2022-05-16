import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from 'user/Login';
import User from 'user/User';
import { Avatar, Collapse, Container, createTheme, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, ThemeProvider } from '@mui/material';
import { ExpandLess, ExpandMore, Send, StarBorder, Title, Work } from '@mui/icons-material';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);

  if (!location.state)
    return Login();

  const user: User = location.state as User;
  if (user == null || !user.enabled)
    return Login();

  function handleExpand() {
    setOpen(!open);
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <Work />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItemButton>
          <ListItemButton onClick={handleExpand}>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Container>
    </ThemeProvider>
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
