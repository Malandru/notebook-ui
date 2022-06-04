import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from 'user/Login';
import User from 'user/User';
import Session from 'user/Session'
import { AppBar, Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Collapse, Container, createTheme, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, Send, StarBorder, Work, FactCheckOutlined, AddOutlined, Menu, EditOutlined, FactCheck } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SummaryCard from 'xdomain/Summary';
import BudgetSummary from 'summary/BudgetSummary';
import API from 'api/Rest';
import Budget from 'budget/Budget';
import UserSummary from 'summary/UserSummary';

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
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState<Budget|null>(null);
  const [summary, setSummary] = useState(new UserSummary());
  const [userBudgets, setUserBudgets] = useState<Budget[]>([]);
  const [user, setUser] = useState<User|null>(Session.restoreUser());

  useEffect(() => {
    if (user == null) {
      return;
    }
    const response = API.getUserSummary(user);
    response.then(userSummary => {
      const currentBudget = summary.budgets.find(x => x.budgetID == summary.currentBudgetID);
      if (currentBudget) {
        console.log('setting budget');
        setBudget(currentBudget);
      }
      setUserBudgets(userSummary.budgets);
      setSummary(userSummary);
      console.log(userSummary);
    }).catch(serverError => console.log(serverError));
  }, [budget, summary]);

  if (user === null) {
    return (<Navigate to="/login" />);
  }

  return (
    <Container component="main" maxWidth="md">
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <FactCheck />
            </Avatar>
          }
          action={
            <IconButton aria-label="edit">
              <EditOutlined />
            </IconButton>
          }
          title={
            <Typography variant="h4" component="h2">
              Budget Name
            </Typography>
          }
          subheader="del 24 de enero de 2022 al 25 de febrero de 2022"
        />
        <CardContent>
          <Stack direction="row" spacing="auto" component="span">
            <Chip label="$1000" color="secondary" />
            <Chip label="$200" color="warning" />
            <Chip label="$1000" color="default" />
            <Chip label="$800" color="primary" />
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small">Ver presupuesto</Button>
        </CardActions>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider textAlign="left">Mensuales</Divider>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="Cada dia 15 del mes | Category | Tag"/>
              <Chip label="$50" color="secondary" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="Cada dia 30 del mes | Category | Tag"/>
              <Chip label="$50" color="secondary" />
            </ListItemButton>
            <Divider textAlign="left">Extraordinarios</Divider>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="25-Mayo-2022 | Category | Tag | Cuenta"/>
              <Chip label="$50" color="warning" />
            </ListItemButton>
          </List>
        </Collapse>
      </Card>
      
      <SummaryCard 
        budget={budget}
        budgetData={summary.budgetSummary} />
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
