import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React from "react";
import { capitalize } from "xdomain/Utils";
import Category from "./Category";
import { TransactionForm } from "./Transaction";

interface TransactionDialogProps {
  onSubmit: () => void,
  children: JSX.Element,
  transactionState: [TransactionForm, React.Dispatch<React.SetStateAction<TransactionForm>>],
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
};

function TransactionDialog(props: TransactionDialogProps) {
  const { onSubmit, children, transactionState, openState } = props;
  const [open, setOpen] = openState;
  const [transactionForm, setTransactionForm] = transactionState;

  const handleSelectChange = (event: SelectChangeEvent) => {
    setTransactionForm({
      ...transactionForm,
      category: event.target.value as Category
    });
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Update this title</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new record, please fill the following fields
        </DialogContentText>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={transactionForm.category as string}
              label="Category"
              onChange={handleSelectChange}
            >
              <MenuItem value={Category.EXPENSE}>{capitalize(Category.EXPENSE)}</MenuItem>
              <MenuItem value={Category.INCOME}>{capitalize(Category.INCOME)}</MenuItem>
              <MenuItem value={Category.SAVING}>{capitalize(Category.SAVING)}</MenuItem>
              <MenuItem value={Category.INVESTMENT}>{capitalize(Category.INVESTMENT)}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="concept"
            label="Concept"
            name="concept"
            autoFocus
            onChange={e => transactionForm.concept = e.target.value}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Amount"
            type="number"
            onChange={e => transactionForm.amount = Number(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
          <Divider />
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ marginRight: 'auto' }}
          color="error"
          onClick={() => setOpen(false)}
        >Cancel</Button>
        <Button onClick={onSubmit} type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TransactionDialog;