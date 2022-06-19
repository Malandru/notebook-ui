import { AddOutlined, EditOutlined, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Collapse, Divider, IconButton, List, Stack, Typography } from "@mui/material";
import Totals from "movement/Totals";
import Transaction from "movement/Transaction";
import TransactionItems from "movement/TransactionItems";
import { useState } from "react";
import { currencyFormat } from "xdomain/Utils";

export interface Summary {
  divider: string,
  transactions: Transaction[]
};

interface SummaryProps {
  title: string | null,
  subheader: string,
  totals: Totals | null,
  summaryList: Summary[]
};

function SummaryCard(props: SummaryProps) {
  const [expand, setExpand] = useState(false);
  const { title, subheader, totals, summaryList } = props;

  const expandOnClick = () => {
    setExpand(!expand);
  }

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2 }}>
      <CardActionArea onClick={expandOnClick}>
        <CardHeader
          title={
            <Typography variant="h4" component="h2">
              {title}
            </Typography>
          }
          subheader={subheader}
        />
        <CardContent>
          <Stack direction="row" spacing="auto" component="span">
            <Chip label={currencyFormat(totals?.totalIncomes)} color="secondary" />
            <Chip label={currencyFormat(totals?.totalExpenses)} color="warning" />
            <Chip label={currencyFormat(totals?.totalSavings)} color="default" />
            <Chip label={currencyFormat(totals?.totalInvestments)} color="primary" />
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="more" onClick={expandOnClick}>
          {expand ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <IconButton aria-label="edit">
          <EditOutlined />
        </IconButton>
        <IconButton aria-label="add" sx={{ marginLeft: 'auto' }}>
          <AddOutlined />
        </IconButton>
      </CardActions>

      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {summaryList.map((summary, index) => {
            return (
              <div key={index}>
                <Divider textAlign="left">{summary.divider}</Divider>
                <TransactionItems transactions={summary.transactions} />
              </div>
            );
          })}
        </List>
      </Collapse>
    </Card>
  );
}

export default SummaryCard;