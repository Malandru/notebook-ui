import ServerError from "./ServerError";

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

enum HTTP {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

class Service {
    domain: string;
    options: any;

    constructor() {
        this.domain = "http://localhost:5000/";
    }

    async request<TResponse>(requestURL:string, method:HTTP): Promise<TResponse> {
        let url:string = new URL(requestURL, this.domain).href;
        console.log(url);
        this.options = {headers, method};
        
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
}

export default Service;