import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reservation } from '../models/reservation';

@Injectable({
    providedIn: 'root',
  })
  export class ReservationService {
      
    private apiUrl = environment.cm + '/api/Reservations';
  
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
  
    createReservation(clientData: Reservation): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/Create`, clientData, this.httpOptions);
    }
  }