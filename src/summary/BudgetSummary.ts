import BudgetItem from "budget/BudgetItem";

class BudgetSummary {
  budgetName: string | null;
  startDate: Date | null;
  endDate: Date | null;
  monthlyItems: BudgetItem[];
  extraordinaryItems: BudgetItem[];
  
  constructor() {
    this.budgetName = null;
    this.startDate = null;
    this.endDate = null;
    this.monthlyItems = [];
    this.extraordinaryItems = [];
  }
}

export default BudgetSummary;