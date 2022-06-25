import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import { capitalize } from "xdomain/Utils";
import Category from "./Category";
import { ITransaction } from "./Transaction";

interface TransactionDialogProps {
  onSubmit: () => void;
};

function TransactionDialog(props: TransactionDialogProps) {
  const [transactionForm, setTransactionForm] = useState<ITransaction>({
    category: Category.INCOME,
    concept: null,
    amount: null,
    tag: null
  });

  const handleSelectChange = (event: SelectChangeEvent) => {
    setTransactionForm({
      ...transactionForm,
      category: event.target.value as Category
    });
  }

  return (
    <Dialog open={true}>
      <DialogTitle>Update this title</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new record, please fill the following fields
        </DialogContentText>
        <Box component="form" onSubmit={props.onSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={transactionForm.category as string}
              label="Age"
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
            name="amount"
            label="Amount"
            type="number"
            id="amount"
            onChange={e => transactionForm.amount = Number(e.target.value)}
          />
          <Divider />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TransactionDialog;