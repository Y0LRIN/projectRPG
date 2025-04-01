import { Caster } from './classe/caster';
import { Clerk } from './classe/clerk';

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
    private healingAmount: number;

    public constructor(name: string, description: string, healingAmount: number, canResurrect: boolean) {
        super(name, description);
        this.healingAmount = healingAmount;
        this.canResurrect = canResurrect;
    }

    public getHealingAmount() {
        return this.healingAmount;
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

    public getCanResurrect(): boolean {
        return this.canResurrect;
    }
}

export class ManaObjects extends Object {
    private manaAmount: number;

    public constructor(name: string, description: string, manaAmount: number) {
        super(name, description);
        this.manaAmount = manaAmount;
    }

    public getManaAmount() {
        return this.manaAmount;
    }

    public restoreMana(target: any): void {
        if (target instanceof Caster || target instanceof Clerk) {
            console.log(`${this.getName()} is restoring mana to ${target}`);
            target.RestoreMana(this.manaAmount);
        } else {
            console.log(`${this.getName()} cannot restore mana to this target`);
        }
    }
}