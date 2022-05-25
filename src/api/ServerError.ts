class ServerError {
  title: string;
  details: string;
  httpStatus: string;
  displayMessage: boolean;
  debugMessage: string;

  constructor(title: string, details: string, httpStatus: string, displayMessage: boolean, debugMessage: string) {
    this.title = title;
    this.details = details;
    this.httpStatus = httpStatus;
    this.displayMessage = displayMessage;
    this.debugMessage = debugMessage;
  }
}

export default ServerError;