export class Pack {
    constructor(ClassesUsed: number, Type: string) {
        this.Type = Type;
        this.ClassesUsed = ClassesUsed;
    }
    Type!: string;
    ClassesUsed!: number;
}

