import { AppBar, Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Collapse, Container, createTheme, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, Send, StarBorder, Work, FactCheckOutlined, AddOutlined, Menu, EditOutlined, FactCheck } from '@mui/icons-material';
import { useState } from 'react';

interface Props {
  title: string;
  subtitle: string;
  expandLabel: string;
  onAdd?: () => void;
  budgetData?: {};
};

function SummaryCard(props: Props) {
  const [open, setOpen] = useState(false);

  const handleExpand = () => {
    setOpen(!open);
  }

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <CardHeader
          avatar={
            <Avatar>
              <FactCheck />
            </Avatar>
          }
          action={
            <IconButton aria-label="edit">
              <AddOutlined />
            </IconButton>
          }
          title={
            <Typography variant="h4" component="h2">
              {props.title}
            </Typography>
          }
          subheader={props.subtitle}
        />
        <CardContent>
          <Stack direction="row" spacing="auto" component="span">
            <Chip label="$1000" color="secondary" />
            <Chip label="$200" color="warning" />
            <Chip label="$1000" color="default" />
            <Chip label="$800" color="primary" />
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={handleExpand} size="small">{props.expandLabel}</Button>
        </CardActions>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider textAlign="left">25/Mayo/2022</Divider>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="Category | Tag | Cuenta"/>
              <Chip label="$50" color="secondary" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="Category | Tag | Cuenta"/>
              <Chip label="$50" color="secondary" />
            </ListItemButton>
            <Divider textAlign="left">8/Mayo/2022</Divider>
            <ListItemButton>
              <ListItemText primary="Concepto de transaccion" secondary="Category | Tag | Cuenta"/>
              <Chip label="$50" color="warning" />
            </ListItemButton>
          </List>
        </Collapse>
      </Card>
  );
}

export default SummaryCard;