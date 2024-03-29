import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import API from "api/Rest";
import ServerError from "api/ServerError";
import Category from "movement/Category";
import { TransactionForm } from "movement/Transaction";
import TransactionDialog from "movement/TransactionDialog";
import { useState } from "react";
import { Event, EventConf, EventNotification, EventType } from "xdomain/AlertEvent";
import Budget from "./Budget";
import BudgetItem, { BudgetItemForm, PeriodType } from "./BudgetItem";

interface BudgetItemDialogProps {
  budget: Budget,
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
};

function BudgetItemDialog(props: BudgetItemDialogProps) {
  const { budget, openState } = props;
  const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.MONTHLY);
  const [event, setEvent] = useState<Event>({
    title: "",
    details: "",
    severity: "success",
    display: false,
    type: EventType.INITIAL
  });

  const [transactionForm, setTransactionForm] = useState<TransactionForm>({
    category: Category.EXPENSE,
    concept: null,
    amount: null,
    tag: null
  });

  const budgetItemForm: BudgetItemForm = {
    budgetID: budget.budgetID,
    periodType: periodType,
    monthDay: null,
    yearDate: null,
  };

  const submitBudgetItemForm = () => {
    setEvent((prev) => { return { ...prev, type: EventType.LOADING } });
    const response = API.createBudgetItem(transactionForm, budgetItemForm);
    response.then((budgetItem: BudgetItem) => {
      console.log(budgetItem);
      if (budgetItem.concept !== null) {
        setEvent({
          ...event,
          title: "Budget Item created",
          details: budgetItem.concept,
          severity: "success",
          display: true,
          type: EventType.SUCCESS
        });
      }
      else {
        setEvent({
          ...event,
          title: "Error creating budget item",
          details: "Failed to process response",
          display: true,
          type: EventType.FAILED
        });
      }
    }).catch((serverError: ServerError) => setEvent(EventConf.configServerError(serverError)));
  }

  return (
    <>
      <EventNotification event={event} />
      <TransactionDialog
        transactionState={[transactionForm, setTransactionForm]}
        openState={openState}
        onSubmit={submitBudgetItemForm} >
        <>
          <TextField
            margin="normal"
            required
            disabled
            fullWidth
            label="Budget"
            value={budget.budgetName}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={periodType}
              label="Type"
              onChange={(e: SelectChangeEvent) => setPeriodType(e.target.value as PeriodType)}
            >
              <MenuItem value={PeriodType.MONTHLY}>{PeriodType.MONTHLY}</MenuItem>
              <MenuItem value={PeriodType.YEARLY}>{PeriodType.YEARLY}</MenuItem>
            </Select>
          </FormControl>
          {periodType === PeriodType.MONTHLY ?
            <TextField
              margin="normal"
              required={periodType === PeriodType.MONTHLY}
              fullWidth
              name="month-day"
              label="Month day"
              type="number"
              id="month-day"
              onChange={e => budgetItemForm.monthDay = Number(e.target.value)}
            /> :
            <TextField
              margin="normal"
              required={periodType === PeriodType.YEARLY}
              fullWidth
              name="year-date"
              label="Year date"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={e => budgetItemForm.yearDate = new Date(e.target.value)}
            />
          }
        </>
      </TransactionDialog>
    </>
  );
}

export default BudgetItemDialog;