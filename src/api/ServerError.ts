class ServerError {
  title: string | null;
  details: string | null;
  httpStatus: string | null;
  displayMessage: boolean | null;
  debugMessage: string | null;

  constructor(title?: string, details?: string, httpStatus?: string, displayMessage?: boolean, debugMessage?: string) {
    this.title = title ?? null;
    this.details = details ?? null;
    this.httpStatus = httpStatus ?? null;
    this.displayMessage = displayMessage ?? null;
    this.debugMessage = debugMessage ?? null;
  }
}

export default ServerError;