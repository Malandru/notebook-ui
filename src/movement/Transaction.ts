class Transaction {
  category: string | null;
  concept: string | null;
  amount: number | null;
  tag: null;

  constructor() {
    this.category = null;
    this.concept = null;
    this.amount = null;
    this.tag = null;
  }
}

export default Transaction;