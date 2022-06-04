class Budget {
  budgetID: string | null;
  budgetName: string | null;
  userID: string | null;
  startDate: Date | null;
  endDate: Date | null;

  constructor(budgetName?: string, userID?: string | null, startDate?: Date, endDate?: Date) {
    this.budgetID = null;
    this.budgetName = budgetName ?? null;
    this.userID = userID ?? null;
    this.startDate = startDate ?? null;
    this.endDate = endDate ?? null;
  }
}

export type IBudget = Pick<Budget, "budgetID" |"budgetName">

export default Budget;