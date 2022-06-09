export function currencyFormat(x: number | null | undefined): string {
  if (x == null) {
    return "$__.00";
  }
  return "$" + x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}