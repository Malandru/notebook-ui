import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from 'user/Login';
import User from 'user/User';
import Session from 'user/Session'
import { AppBar, CircularProgress, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import API from 'api/Rest';
import Budget from 'budget/Budget';
import UserSummary from 'summary/UserSummary';
import BudgetSummaryCard from 'summary/BudgetSummaryCard';
import { Event, EventConf, EventNotification, EventType } from 'xdomain/AlertEvent';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Notebook
          </Typography>
        </Toolbar>
      </AppBar>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function HomePage() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [userSummary, setUserSummary] = useState(new UserSummary());
  const [userBudgets, setUserBudgets] = useState<Budget[]>([]);
  const [event, setEvent] = useState<Event>(EventConf.configInitial());
  const user: User | null = Session.restoreUser();

  useEffect(() => {
    if (user == null) {
      return;
    }
    setEvent((prevEvent) => EventConf.configLoading(prevEvent));
    const response = API.getUserSummary(user);
    response.then(summary => {
      const currentBudget = summary.budgets.find(x => x.budgetID == summary.currentBudgetID);
      if (currentBudget) {
        setBudget(currentBudget);
      }
      setUserBudgets(summary.budgets);
      setUserSummary(summary);
      setEvent((prevEvent) => ({
        ...prevEvent,
        severity: "success",
        type: EventType.COMPLETE,
        display: false,
      }));
    }).catch(serverError => setEvent(EventConf.configServerError(serverError)));
  }, []);

  if (user === null) {
    return (<Navigate to="/login" />);
  }

  return (
    <Container component="main" maxWidth="sm">
      <EventNotification event={event} />

      {event.type === EventType.LOADING ? <CircularProgress />
        : <BudgetSummaryCard budget={budget} budgetSummary={userSummary.budgetSummary} />}
    </Container>
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
