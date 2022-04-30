import ServerError from "./ServerError";
import { Buffer } from "buffer";

enum HTTP {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

class Service {
    headers: any;
    domain: string;
    options: any;

    constructor(username: string, password: string) {
        const basic = Buffer.from((username + ":" + password)).toString('base64');
        this.domain = "http://localhost:5000/";
        this.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Basic " + basic,
        };
    }

    async request<TResponse>(requestURL:string, method:HTTP, body:any = undefined): Promise<TResponse> {
        let url:string = new URL(requestURL, this.domain).href;
        console.log(url);
        if (body === undefined)
            body = "";
        else
            body = JSON.stringify(body);
        console.log(body);
        this.options = {headers: this.headers, method, body};
        
        let response = await fetch(url, this.options);
        return response.json()
        .then(data => new Promise( (resolve, reject) => {
            if(data instanceof ServerError )
                reject(data as ServerError);
            resolve(data as TResponse);
        }));
    }

    get<TResponse>(requestURL:string): Promise<TResponse> {
        return this.request<TResponse>(requestURL, HTTP.GET);
    }

    post<TResponse>(requestURL: string, body: any): Promise<TResponse> {
        return this.request(requestURL, HTTP.POST, body);
    }
}

export default Service;