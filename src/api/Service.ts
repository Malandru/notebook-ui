import { rejects } from "assert";
import { Buffer } from "buffer";
import User from "../user/User";
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

    setAuthorization(user: User) {
        const basic = Buffer.from((user.username + ":" + user.password)).toString('base64');
        this.headers.Authorization = "Basic " + basic;
        user.password = "";
    }

    async request<TResponse>(requestURL:string, method:HTTP, body:any = undefined): Promise<TResponse> {
        let url:string = new URL(requestURL, this.domain).href;
        if (body === undefined)
            body = "";
        else
            body = JSON.stringify(body);
        const options = {headers: this.headers, method, body};
        
        let response = await fetch(url, options);
        if (response.ok) {
            return response.json()
            .then(data => new Promise( (resolve, reject) => {
                if(data instanceof ServerError )
                    reject(data as ServerError);
                resolve(data as TResponse);
            }));
        }
        else {
            return response.text()
            .then(text => Promise.reject(new ServerError(text)));
        }
    }

    get<TResponse>(requestURL:string): Promise<TResponse> {
        return this.request<TResponse>(requestURL, HTTP.GET);
    }

    post<TResponse>(requestURL: string, body: any): Promise<TResponse> {
        return this.request(requestURL, HTTP.POST, body);
    }
}

export default Service;