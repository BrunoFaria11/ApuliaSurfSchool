import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Email } from '../models/email';



@Injectable({
    providedIn: 'root',
})
export class EmailServices {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
        this.httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        this.httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    }

    addEmail(email: Email) {
        return this.http.post(environment.cm + '/api/emails', { email: email });
    }

    getEmailTemplate(type: number) {
        return this.http.get(
            environment.cm +
            '/api/EmailTemplates?Type=' + type,
            this.httpOptions
        );
    }
}