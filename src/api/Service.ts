import { Buffer } from "buffer";
import { IUser } from "user/User";
import ServerError from "./ServerError";

enum HTTP {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

class Service {
  headers: any;
  domain: string;

  private static _instance: Service;

  constructor() {
    this.domain = "http://localhost:5000/";
    this.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "",
    };
  }

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  setAuthorization(user: IUser) {
    const basic = Buffer.from((user.username + ":" + user.password)).toString('base64');
    this.headers.Authorization = "Basic " + basic;
    localStorage.setItem('auth-token', basic);
  }

  private async parseResponse<TResponse>(response: Response): Promise<TResponse> {
    if (response.headers.get('Content-Type') === 'application/json') {
      const data = await response.json();
      return await new Promise((resolve, reject) => {
        const serverError: ServerError = new ServerError();
        if (Object.keys(serverError).every((key) => data[key] !== undefined)) {
          console.log("Rejecting promise response as ServerError");
          reject(data as ServerError);
        }
        else {
          console.log("Resolving promise response as custom class");
          resolve(data as TResponse);
        }
      });
    }
    else {
      console.log("Rejecting promise as Unexpected response");
      return Promise.reject(new ServerError(
        "Error parsing response",
        "Unexpected response from: " + response.url,
        response.statusText, true));
    }
  }

  private async request<TResponse>(requestURL: string, method: HTTP, body: any = undefined): Promise<TResponse> {
    const url: string = new URL(requestURL, this.domain).href;
    const auth = localStorage.getItem('auth-token');
    this.headers.Authorization = "Basic " + (auth ?? "");

    if (body === undefined)
      body = "";
    else
      body = JSON.stringify(body);
    const options = { headers: this.headers, method, body };

    try {
      const response: Response = await fetch(url, options);
      return this.parseResponse<TResponse>(response);
    } catch (e) {
      const error = e as Error;
      return Promise.reject(new ServerError(
        "Fetch error: " + error.name,
        error.message,
        undefined,
        false,
        error.stack));
    }
  }

  get<TResponse>(requestURL: string): Promise<TResponse> {
    return this.request<TResponse>(requestURL, HTTP.GET);
  }

  post<TResponse>(requestURL: string, body: any): Promise<TResponse> {
    return this.request(requestURL, HTTP.POST, body);
  }
}

export default Service;