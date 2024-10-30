import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pack } from '../models/pack';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private apiUrl = environment.cm + '/api/Emails';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Access-Control-Allow-Credentials': 'true',
    }),
  };

  createEmail(packData: Email): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Create`, packData, this.httpOptions);
  }
  
}
