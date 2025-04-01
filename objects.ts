export class Object {
    private name: string;
    private description: string;

    public constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
    public use(target: any): void {
        console.log(`Using ${this.name} on ${target}`);
    }   

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }
}

export class HealingObjects extends Object {
    private canResurrect: boolean;

    public constructor(name: string, description: string, canResurrect: boolean) {
        super(name, description);
        this.canResurrect = canResurrect;
    }

    public heal(target: any): void {
        console.log(`${this.getName()} is healing ${target}`);
    }

    public resurrect(target: any): void {
        if (this.canResurrect) {
            console.log(`${this.getName()} is resurrecting ${target}`);
        } else {
            console.log(`${this.getName()} cannot resurrect`);
        }
    }

    public canPerformResurrection(): boolean {
        return this.canResurrect;
    }
}