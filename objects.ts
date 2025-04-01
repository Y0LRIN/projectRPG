import { Caster } from './classe/caster';
import { Clerk } from './classe/clerk';
import { Team } from './team';

export class Object {
    private name: string;
    private description: string;
    public useNbr: number;

    public constructor(name: string, description: string, useNbr: number) {
        this.name = name;
        this.description = description;
        this.useNbr = useNbr;
    }
    public use(target: any, team: Team): void {
        console.log(`Using ${this.name} on ${target}`);
        if (target instanceof HealingObjects) {
            target.heal(target);
        } else if (target instanceof ManaObjects) {
            target.restoreMana(target);
        } else {
            console.log(`Cannot use ${this.name} on ${target}`);
        }
        this.useNbr--;
        if (this.useNbr <= 0) {
            console.log(`${this.name} has no uses left!`);
            team.removeFromInventory(this); // Use the team instance to remove the item
        } else {
            console.log(`${this.name} has ${this.useNbr} uses left!`);
        }
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

    public constructor(name: string, description: string, useNbr: number, healingAmount: number, canResurrect: boolean) {
        super(name, description, useNbr);
        this.healingAmount = healingAmount;
        this.canResurrect = canResurrect;
    }

    public getHealingAmount() {
        return this.healingAmount;
    }

    public heal(target: any): void {
        if (target.isAlive()) {
            if (target.currenthealth + this.healingAmount > target.maxHealth) {
                target.currenthealth = target.maxHealth;
            } else {
                target.currenthealth += this.healingAmount;
            }
            console.log(`${target.getName()} healed for ${this.healingAmount} health!`);
        } else {
            console.log(`${target.getName()} is dead and cannot be healed!`);
        }
    }

    public resurrect(target: any): void {
        if (this.canResurrect) {
            if (!target.isAlive()) {
                target.currenthealth = target.maxHealth * (this.healingAmount / 100);
                console.log(`${target.getName()} has been resurrected with ${target.currenthealth} health!`);
            } else {
                console.log(`${target.getName()} is already alive!`);
            }
        } else {
            console.log(`${this.getName()} cannot resurrect`);
        }
    }

    public healUse(target: any) {
        if (this.canResurrect && !target.isAlive()) {
            this.resurrect(target);
        } else {
            this.heal(target);
        }
    }

    public getCanResurrect(): boolean {
        return this.canResurrect;
    }
}

export class ManaObjects extends Object {
    private manaAmount: number;

    public constructor(name: string, description: string, useNbr: number, manaAmount: number) {
        super(name, description, useNbr);
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