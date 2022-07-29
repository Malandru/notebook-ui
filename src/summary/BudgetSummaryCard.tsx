import { Typography } from "@mui/material";
import Budget from "budget/Budget";
import BudgetItemDialog from "budget/BudgetItemDialog";
import { useState } from "react";
import BudgetSummary from "./BudgetSummary";
import SummaryCard, { Summary } from "./SummaryCard";

interface BudgetSummaryProps {
  budget: Budget | null,
  budgetSummary: BudgetSummary | null
};

function BudgetSummaryCard(props: BudgetSummaryProps) {
  const { budget, budgetSummary } = props;
  const openBudgetItemDialogState = useState(false);

  if (budget === null) {
    return (
      <Typography variant="h4" component="h2">
        No budgets available
      </Typography>
    );
  }

  if (budgetSummary === null) {
    return (
      <Typography variant="h4" component="h2">
        No summary available
      </Typography>
    );
  }

  const summaryList: Summary[] = [
    { divider: "Mensuales", transactions: budgetSummary.monthlyItems },
    { divider: "Extraordinarios", transactions: budgetSummary.extraordinaryItems }
  ];

  return (
    <>
      <BudgetItemDialog openState={openBudgetItemDialogState} budget={budget} />
      <SummaryCard
        title={budget.budgetName}
        subheader={`Del ${budget.startDate} al ${budget.endDate}`}
        totals={budgetSummary.totals}
        summaryList={summaryList}
        addState={openBudgetItemDialogState} />
    </>
  );
}

export default BudgetSummaryCard;