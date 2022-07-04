import { Close } from "@mui/icons-material";
import { Alert, AlertColor, AlertTitle, IconButton, Snackbar } from "@mui/material";
import ServerError from "api/ServerError";
import { useState } from "react";

export const enum EventType {
  INITIAL,
  LOADING,
  COMPLETE,
  SUCCESS,
  FAILED,
  WARNING,
}

export interface Event {
  title: string | null;
  details: string | null;
  severity: AlertColor;
  display: boolean;
  type: EventType;
}

export class EventConf {
  public static configServerError(serverError: ServerError): Event {
    if (serverError.displayMessage) {
      console.log(serverError);
    }
    return {
      title: serverError.title + " ==> " + serverError.httpStatus,
      details: serverError.details,
      severity: "error",
      display: true,
      type: EventType.FAILED,
    };
  }
}

interface EventNotificationProps {
  event: Event,
}

export function EventNotification(props: EventNotificationProps) {
  const { event } = props;
  const [open, setOpen] = useState(event.display);

  if (event.display && !open) {
    setOpen(true);
  }

  const handleCloseAlert = () => {
    event.display = false;
    setOpen(false);
  }

  return (
    <Snackbar open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={5000}
      onClose={handleCloseAlert}
    >
      <Alert
        severity={event.severity}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseAlert}
          >
            <Close fontSize="small" />
          </IconButton>}>
        <AlertTitle>{event.title}</AlertTitle>
        {event.details}
      </Alert>
    </Snackbar>
  );
}