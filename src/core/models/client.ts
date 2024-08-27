export class Client {
    constructor(Name: string, Email: string, PhoneNumber: string) {
        this.Name = Name;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
    }
    Name!: string;
    Email!: string;
    PhoneNumber!: string;
}


