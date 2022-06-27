import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import API from "api/Rest";
import ServerError from "api/ServerError";
import Category from "movement/Category";
import { TransactionForm } from "movement/Transaction";
import TransactionDialog from "movement/TransactionDialog";
import { useState } from "react";
import Budget from "./Budget";
import BudgetItem, { BudgetItemForm } from "./BudgetItem";

const enum PeriodType {
  MONTHLY = "Every month",
  YEARLY = "Every year",
};

interface BudgetItemDialogProps {
  budget: Budget,
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
};

function BudgetItemDialog(props: BudgetItemDialogProps) {
  const { budget, openState } = props;
  const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.MONTHLY);
  const [transactionForm, setTransactionForm] = useState<TransactionForm>({
    category: Category.EXPENSE,
    concept: null,
    amount: null,
    tag: null
  });

  const budgetItemForm: BudgetItemForm = {
    budgetID: budget.budgetID,
    monthDay: null,
    yearDate: new Date(),
  };

  const submitBudgetItemForm = () => {
    const response = API.createBudgetItem(transactionForm, budgetItemForm);
    response.then((budgetItem: BudgetItem) => console.log(budgetItem))
      .catch((serverError: ServerError) => console.log(serverError));
  }

  return (
    <>
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
            />
          }
        </>
      </TransactionDialog>
    </>
  );
}

export default BudgetItemDialog;