import Transaction from "movement/Transaction";

export const enum PeriodType {
  MONTHLY = "Every month",
  YEARLY = "Every year",
};

class BudgetItem extends Transaction {

  budgetID: string | null;
  periodType: PeriodType | null;
  monthDay: number | null;
  yearDate: Date | null;

  constructor() {
    super();
    this.budgetID = null;
    this.periodType = null;
    this.monthDay = null;
    this.yearDate = null;
  }
}

export type BudgetItemForm = Pick<BudgetItem, "budgetID" | "monthDay" | "yearDate" | "periodType">;

export default BudgetItem;