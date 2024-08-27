export class Reservation {
    constructor(Date: string, Type: string, Hour: string, Comment: string) {
        this.Date = Date;
        this.Type = Type;
        this.Hour = Hour;
        this.Comment = Comment;
    }
    Date!: string;
    Type!: string;
    Hour!: string;
    Comment!: string;
}

