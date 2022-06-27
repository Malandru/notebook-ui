import Category from "./Category";

class Transaction {
  transactionID: string | null;
  category: Category | null;
  concept: string | null;
  amount: number | null;
  tag: null;

  constructor() {
    this.transactionID = null;
    this.category = null;
    this.concept = null;
    this.amount = null;
    this.tag = null;
  }
}

export type TransactionForm = Pick<Transaction, "category" | "concept" | "amount" | "tag">;

export default Transaction;