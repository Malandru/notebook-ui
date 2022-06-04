import Budget from "budget/Budget";
import BudgetSummary from "./BudgetSummary";

class UserSummary {
  budgets: Budget[];
  currentBudgetID: string | null;
  budgetSummary: BudgetSummary | null;

  constructor() {
    this.budgets = [];
    this.currentBudgetID = null;
    this.budgetSummary = null;
  }
}

export default UserSummary;