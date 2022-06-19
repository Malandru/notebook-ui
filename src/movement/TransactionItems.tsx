import { Chip, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { categoryColor, currencyFormat } from "xdomain/Utils";
import Transaction from "./Transaction";

interface TransactionItemsProps {
  transactions: Transaction[] | null | undefined;
};

function TransactionItems(props: TransactionItemsProps) {
  const transactions = props.transactions;
  if (transactions == null || transactions.length <= 0) {
    return (
      <ListItem>
        <ListItemText primary="No hay informacion disponible" />
      </ListItem>
    );
  }

  return (
    <div>
      {transactions.map((trx) => {
        return (
          <ListItemButton key={trx.transactionID}>
            <ListItemText primary={trx.concept} secondary="Category | Tag | Cuenta" />
            <Chip label={currencyFormat(trx.amount)} color={categoryColor(trx.category)} />
          </ListItemButton>
        );
      })}
    </div>
  );
}

export default TransactionItems;