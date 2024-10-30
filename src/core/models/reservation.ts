export class Reservation {
    constructor(ClientId: string, Date: string, Type: string, Time: string, Notes: string) {
        this.ClientId = ClientId;
        this.Date = Date;
        this.Type = Type;
        this.Time = Time;
        this.Notes = Notes;
    }

    ClientId!: string;
    Date!: string;
    Type!: string;
    Time!: string;
    Notes!: string;
}