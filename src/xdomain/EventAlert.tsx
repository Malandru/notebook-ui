import { Alert, AlertColor, AlertTitle, Snackbar } from "@mui/material";
import ServerError from "api/ServerError";

export const enum UI {
  INITIAL,
  LOADING,
  COMPLETE,
  SUCESS,
  FAILED,
  WARNING
}

export class EventAlert {
  title: string;
  details: string;
  severity: AlertColor;
  display: boolean;
  ui: UI;

  constructor() {
    this.title = 'INITIAL';
    this.details = 'INITIAL';
    this.severity = "info";
    this.display = false;
    this.ui = UI.INITIAL;
  }

  public static clone(eventAlert: EventAlert): EventAlert {
    return Object.create(eventAlert) as EventAlert;
  }

  config(title: string, details: string, severity: AlertColor, display: boolean, ui: UI) {
    this.title = title;
    this.details = details;
    this.severity = severity;
    this.display = display;
    this.ui = ui;
  }

  asChangedUI(ui: UI, display: boolean = false) {
    this.ui = ui;
    this.display = display;
    return EventAlert.clone(this);
  }

  asServerError(serverError: ServerError) {
    this.config(serverError.title ?? "", serverError.details ?? "", "error", true, UI.FAILED);
    return EventAlert.clone(this);
  }

  hasProgress(ui: UI): boolean {
    return this.ui === ui;
  }
}

interface Props {
  event: EventAlert,
}

export function EventNotification(props: Props) {
  const event = props.event;

  return (
    <Snackbar open={event.display} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} autoHideDuration={5000}>
      <Alert severity={event.severity}>
        <AlertTitle>{event.title}</AlertTitle>
        {event.details}
      </Alert>
    </Snackbar>
  );
}