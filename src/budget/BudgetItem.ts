import Transaction from "movement/Transaction";

class BudgetItem extends Transaction {

  itemID: string | null;
  monthDay: number | null;
  yearDate: Date | null;

  constructor() {
    super();
    this.itemID = null;
    this.monthDay = null;
    this.yearDate = null;
  }
}

export default BudgetItem;