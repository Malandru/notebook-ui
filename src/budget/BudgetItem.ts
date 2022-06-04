class BudgetItem {
  category: string | null;
  concept: string | null;
  amount: number | null;
  tag: null;

  itemID: string | null;
  monthDay: number | null;
  yearDate: Date | null;

  constructor() {
    this.category = null;
    this.concept = null;
    this.amount = null;
    this.tag = null;

    this.itemID = null;
    this.monthDay = null;
    this.yearDate = null;
  }
}

export default BudgetItem;