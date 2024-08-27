export class Email {
    constructor(From: string, To: string, Message: string,Type:number) {
        this.From = From;
        this.To = To;
        this.Message = Message;
        this.Type = Type;
    }
    From!: string;
    To!: string;
    Message!: string;
    Type!: number;
}


