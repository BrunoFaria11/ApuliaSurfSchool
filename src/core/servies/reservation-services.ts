import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../models/reservation';
import { Client } from '../models/client';
import { environment } from '../../environments/environment';
import { Pack } from '../models/pack';



@Injectable({
    providedIn: 'root',
})
export class ReservationServices {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
        this.httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        this.httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    }

    addReservation(reservation: Reservation, client: Client) {
        return this.http.post(environment.cm + '/api/reservations', { reservation: reservation, client: client });
    }

    addPack(pack: Pack, reservation: Reservation, client: Client) {
        return this.http.post(environment.cm + '/api/packs/post', { pack: pack, reservation: reservation, client: client });
    }
}