import BudgetItem from "budget/BudgetItem";
import Totals from "movement/Totals";

class BudgetSummary {
  budgetName: string | null;
  startDate: Date | null;
  endDate: Date | null;
  monthlyItems: BudgetItem[];
  extraordinaryItems: BudgetItem[];
  totals: Totals | null;

  constructor() {
    this.budgetName = null;
    this.startDate = null;
    this.endDate = null;
    this.monthlyItems = [];
    this.extraordinaryItems = [];
    this.totals = null;
  }
}

export default BudgetSummary;