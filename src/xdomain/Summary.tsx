import { AppBar, Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { AddOutlined, EditOutlined, ExpandLess, ExpandMore, FactCheck } from '@mui/icons-material';
import { useState } from 'react';
import BudgetSummary from 'summary/BudgetSummary';
import BudgetItem from 'budget/BudgetItem';
import Budget from 'budget/Budget';
import { categoryColor, currencyFormat } from './Utils';
interface ItemsProps {
  budgetItems: BudgetItem[] | null | undefined;
};

function BudgetItemsList(props: ItemsProps) {
  const budgetItems = props.budgetItems;
  if (budgetItems == null || budgetItems.length <= 0) {
    return (
      <ListItem>
        <ListItemText primary="No hay informacion disponible" />
      </ListItem>
    );
  }
  return (
    <div>
      {budgetItems.map((budgetItem) => {
        return (
          <ListItemButton key={budgetItem.itemID}>
            <ListItemText primary={budgetItem.concept} secondary="Category | Tag | Cuenta" />
            <Chip label={currencyFormat(budgetItem.amount)} color={categoryColor(budgetItem.category)} />
          </ListItemButton>
        );
      })}
    </div>
  );
}

interface SummaryProps {
  onAdd?: () => void;
  budget: Budget | null;
  budgetData: BudgetSummary | null;
};

function SummaryCard(props: SummaryProps) {
  const [open, setOpen] = useState(false);
  const budget = props.budget;
  const budgetSummary = props.budgetData;
  const totals = budgetSummary?.totals;

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
      <CardActionArea onClick={handleExpand}>
        <CardHeader
          title={
            <Typography variant="h4" component="h2">
              {budget.budgetName}
            </Typography>
          }
          subheader={`Del ${budget.startDate} al ${budget.endDate}`}
        />
        <CardContent>
          <Stack direction="row" spacing="auto" component="span">
            <Chip label={currencyFormat(totals?.totalIncomes)} color="secondary" />
            <Chip label={currencyFormat(totals?.totalExpenses)} color="warning" />
            <Chip label={currencyFormat(totals?.totalSavings)} color="default" />
            <Chip label={currencyFormat(totals?.totalInvestments)} color="primary" />
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="more" onClick={handleExpand}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <IconButton aria-label="edit">
          <EditOutlined />
        </IconButton>
        <IconButton aria-label="add" sx={{ marginLeft: 'auto' }}>
          <AddOutlined />
        </IconButton>
      </CardActions>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Divider textAlign="left">Mensuales</Divider>
          <BudgetItemsList budgetItems={props.budgetData?.monthlyItems} />

          <Divider textAlign="left">Extraordinarios</Divider>
          <BudgetItemsList budgetItems={props.budgetData?.extraordinaryItems} />
        </List>
      </Collapse>
    </Card>
  );
}

export default SummaryCard;