export class Pack {
    constructor(ClientId: string, TotalAvailableClasses: string, Date: string, Type: string, Time: string, Notes: string) {
        this.ClientId = ClientId;
        this.Date = Date;
        this.Type = Type;
        this.Time = Time;
        this.Notes = Notes;
        this.TotalAvailableClasses = TotalAvailableClasses;
    }

    ClientId!: string;
    TotalAvailableClasses!: string;
    Date!: string;
    Type!: string;
    Time!: string;
    Notes!: string;
}
