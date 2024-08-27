import { HttpClient, HttpHeaders } from "@angular/common/http";

export class BaseServices {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor() {
        this.httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        this.httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    }
}