import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import TransactionDialog from "movement/TransactionDialog";
import { useState } from "react";
import Budget from "./Budget";

const enum PeriodType {
  MONTHLY = "Every month",
  YEARLY = "Every year",
};

interface BudgetItemDialogProps {
  budget: Budget,
};

function BudgetItemDialog(props: BudgetItemDialogProps) {
  const { budget } = props;
  const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.MONTHLY);

  return (
    <>
      <TransactionDialog onSubmit={() => { }} >
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
              required
              fullWidth
              name="month-day"
              label="Month day"
              type="number"
              id="month-day"
            /> :
            <TextField
              margin="normal"
              required
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