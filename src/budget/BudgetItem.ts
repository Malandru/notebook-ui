import Transaction from "movement/Transaction";

class BudgetItem extends Transaction {

  budgetID: string | null;
  monthDay: number | null;
  yearDate: Date | null;

  constructor() {
    super();
    this.budgetID = null;
    this.monthDay = null;
    this.yearDate = null;
  }
}

export type BudgetItemForm = Pick<BudgetItem, "budgetID" | "monthDay" | "yearDate">;

export default BudgetItem;