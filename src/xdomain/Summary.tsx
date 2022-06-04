import { AppBar, Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Collapse, Container, createTheme, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, Send, StarBorder, Work, FactCheckOutlined, AddOutlined, Menu, EditOutlined, FactCheck } from '@mui/icons-material';
import { useState } from 'react';
import BudgetSummary from 'summary/BudgetSummary';
import BudgetItem from 'budget/BudgetItem';
import Budget from 'budget/Budget';

interface SummaryProps {
  onAdd?: () => void;
  budget: Budget | null;
  budgetData: BudgetSummary | null;
};

interface ItemsProps {
  budgetItems: BudgetItem[] | null | undefined;
};

function BudgetItemsList(props: ItemsProps) {
  const budgetItems = props.budgetItems;
  if (budgetItems == null || budgetItems.length <= 0) {
    return (
      <ListItem>
        <ListItemText primary="No hay informacion disponible"/>
      </ListItem>
    );
  }
  return (
    <div>
      {budgetItems.map((budgetItem) => {
        return (
          <ListItemButton key={budgetItem.itemID}>
            <ListItemText primary={budgetItem.concept} secondary="Category | Tag | Cuenta" />
            <Chip label={budgetItem.amount} color="secondary" />
          </ListItemButton>
        );
      })}
    </div>
  );
}

function SummaryCard(props: SummaryProps) {
  const [open, setOpen] = useState(false);
  const budget = props.budget;

  console.log("Rendering budget" + budget);

  const handleExpand = () => {
    setOpen(!open);
  }

  if (budget === null) {
    return (
      <Typography variant="h4" component="h2">
        No budgets available
      </Typography>
    );
  }

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <CardHeader
          avatar={
            <Avatar>
              <FactCheck />
            </Avatar>
          }
          action={
            <IconButton aria-label="edit">
              <AddOutlined />
            </IconButton>
          }
          title={
            <Typography variant="h4" component="h2">
              {budget.budgetName}
            </Typography>
          }
          subheader={`Del ${budget.startDate} al ${budget.endDate}`}
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
          <Button onClick={handleExpand} size="small">Detalles</Button>
        </CardActions>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider textAlign="left">Mensuales</Divider>
            <BudgetItemsList budgetItems={props.budgetData?.monthlyItems} />

            <Divider textAlign="left">Extraordinarios</Divider>
            <BudgetItemsList budgetItems={props.budgetData?.extraordinaryItems} />

            <Divider textAlign="left">25/Mayo/2022</Divider>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="Category | Tag | Cuenta"/>
              <Chip label="$50" color="secondary" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="Category | Tag | Cuenta"/>
              <Chip label="$50" color="secondary" />
            </ListItemButton>
            <Divider textAlign="left">8/Mayo/2022</Divider>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="Category | Tag | Cuenta"/>
              <Chip label="$50" color="warning" />
            </ListItemButton>
          </List>
        </Collapse>
      </Card>
  );
}

export default SummaryCard;