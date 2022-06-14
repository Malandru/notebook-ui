import Category from "movement/Category";

export function currencyFormat(x: number | null | undefined): string {
  if (x == null) {
    return "$__.00";
  }
  return "$" + x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function categoryColor(category: Category | null): "default" | "secondary" | "primary" | "error" | "info" | "success" | "warning" {
  switch (category) {
    case Category.EXPENSE: return "warning";
    case Category.INCOME: return "secondary";
    case Category.SAVING: return "default";
    case Category.INVESTMENT: return "primary";
  
    default: return "info";
  }  
}