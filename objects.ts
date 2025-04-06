import { Caster } from './classe/caster.ts';
import { Clerk } from './classe/clerk.ts';
import { Team } from './team.ts';
import { Character } from './Character.ts';

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
        console.log(`Using ${this.name} on ${target.name}`);
        if (this instanceof HealingObjects) {
            target.heal(target);
        } else if (this instanceof ManaObjects) {
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
    private resurrectAmount: number;
    private healingAmount: number;

    public constructor(name: string, description: string, useNbr: number, healingAmount: number, resurrectAmount: number) {
        super(name, description, useNbr);
        this.healingAmount = healingAmount;
        this.resurrectAmount = resurrectAmount;
    }

    public getHealingAmount() {
        return this.healingAmount;
    }

    public heal(target: Character): void {
        if (target.isAlive()) {
            const healAmount = target.maxHealth * (this.healingAmount / 100);
            const previousHealth = target.currenthealth;
            target.currenthealth += healAmount;
            if (target.currenthealth > target.maxHealth) {
            target.currenthealth = target.maxHealth;
            }
            const actualHeal = target.currenthealth - previousHealth;
            console.log(`${this.getName()} heals ${target.name} for ${actualHeal} health!`);
        } else {
            console.log(`${target.name} is dead and cannot be healed!`);
        }
    }

    public resurrect(target: any): void {
        if (this.resurrectAmount != 0) {
            if (!target.isAlive()) {
                target.currenthealth = target.maxHealth * (this.resurrectAmount / 100);
                console.log(`${target.getName()} has been resurrected with ${target.currenthealth} health!`);
            } else {
                console.log(`${target.getName()} is already alive!`);
            }
        } else {
            console.log(`${this.getName()} cannot resurrect`);
        }
    }

    public healUse(target: any) {
        if (this.resurrectAmount != 0 && !target.isAlive()) {
            this.resurrect(target);
        } else {
            this.heal(target);
        }
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